const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
var cors = require("cors");

const app = express();
const HTTP_PORT = 3001;
const TASK_STATUS = ["To Do", "In Progress", "Complete"];

// body parser
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

// Mongo DB Connection
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
var db;

async function connectToDB() {
  await client.connect();
  db = client.db("qpi");

  console.log("DB Connected Successfully !");
}

connectToDB();

app.param("task_id", async (req, res, next, id) => {
  const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });

  req.task = task;
  next();
});

app.param("user_id", async (req, res, next, id) => {
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  req.user = user;
  next();
});

app.get("/", async (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.get("/tasks", async (req, res) => {
  const resp = await db.collection("tasks").find({}).toArray();

  let tasks = [];

  for (let index = 0; index < resp.length; index++) {
    const task = resp[index];

    const { _id, name, status, owner_id, board = "" } = task;
    const owner = await db
      .collection("users")
      .findOne({ _id: new ObjectId(owner_id) });

    tasks.push({
      _id,
      name,
      status,
      owner,
      board,
    });
  }

  return res.status(200).json({ status: 200, body: tasks });
});

app.post("/tasks", async (req, res) => {
  const { name, owner, status, board } = req.body;

  const ownerDetails = await db.collection("users").findOne({ name: owner });

  if (!ownerDetails) {
    return res.status(404).json({
      status: 404,
      message: "No user with the name",
    });
  }

  const { _id } = ownerDetails;

  await db.collection("tasks").insertOne({
    name,
    status,
    owner_id: _id.toString(),
    board,
  });

  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.post("/login", async (req, res) => {
  const { email = "", password = "" } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Invalid 'email, password'",
    });
  }

  const resp = await db.collection("users").findOne({ email: email });

  if (!resp) {
    return res.status(404).json({
      status: 404,
      message: "No users exists with the provided 'email'",
    });
  }

  const { password: currentPassword } = resp;

  if (password !== currentPassword) {
    return res.status(400).json({
      status: 400,
      message: "Invalid 'password'",
    });
  }

  return res.status(200).json({
    status: 200,
    response: resp,
  });
});

app.put("/tasks/:task_id", async (req, res) => {
  if (!req.task) {
    return res.status(404).json({
      status: 404,
      message: "No task with 'task_id'",
    });
  }

  const { status: curStatus, _id } = req.task;
  const { owner = "", status = "" } = req.body;

  const user = await db.collection("users").findOne({ name: owner });
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "No user with 'owner'",
    });
  }

  await db.collection("tasks").updateOne(
    { _id: _id },
    {
      $set: {
        owner_id: user._id.toString(),
        status: status ? status : curStatus,
      },
    }
  );

  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.get("/users", async (req, res) => {
  const resp = await db.collection("users").find({}).toArray();

  return res.status(200).json({ status: 200, body: resp });
});

app.get("/users/:user_id", async (req, res) => {
  return res.status(200).json({ status: 200, body: req.user });
});

app.post("/users", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password || isAdmin === undefined) {
    return res.status(400).json({
      status: 400,
      message: "Invalid 'name, email, password, isAdmin'",
    });
  }

  const users = await db.collection("users").find({}).toArray();

  const userEmails = users.map(({ email: curEmail }) => {
    return curEmail;
  });

  if (userEmails.includes(email)) {
    return res.status(409).json({
      status: 409,
      message: "Email already taken !",
    });
  }

  await db.collection("users").insertOne({ name, email, password, isAdmin });

  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.post("/bulkUsers", async (req, res) => {
  const { users } = req.body;

  let totalUsers = [];
  for (let index = 0; index < users.length; index++) {
    let obj = {
      name: users[index].Name,
      email: users[index].Email,
      password: users[index].Password,
      isAdmin: users[index].IsAdmin === "Yes" ? true : false,
    };

    totalUsers.push(obj);
  }

  await db.collection("users").insertMany(totalUsers);

  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.put("/users/:user_id", async (req, res) => {
  if (!req.user) {
    return res.status(404).json({
      status: 404,
      message: "No user with 'user_id'",
    });
  }

  const {
    name: curName,
    email: curEmail,
    _id,
    password: curPassword,
  } = req.user;
  const { name = "", email = "", password = "", isAdmin } = req.body;

  await db.collection("users").updateOne(
    { _id: _id },
    {
      $set: {
        name: name ? name : curName,
        email: email ? email : curEmail,
        password: password ? password : curPassword,
        isAdmin: isAdmin,
      },
    }
  );

  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.delete("/users/:user_id", async (req, res) => {
  if (!req.user) {
    return res.status(404).json({
      status: 404,
      message: "No user with 'user_id'",
    });
  }

  await db.collection("users").deleteOne({ _id: req.user._id });

  return res.status(200).json({
    status: 200,
    message: "Successful",
  });
});

app.listen(HTTP_PORT, () =>
  console.log(`Server started listening on ${HTTP_PORT}`)
);
