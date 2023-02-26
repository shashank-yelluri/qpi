const express = require("express");
var cors = require("cors");
const task = require("./routes/task");
const user = require("./routes/user");
const auth = require("./routes/auth");
const { HTTP_PORT, FE_ORIGIN } = require("./utils/constants");

const app = express();

// Body parser
app.use(express.json());

// CORS Middleware
app.use(
  cors({
    origin: [FE_ORIGIN],
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

app.use("/", auth);
app.use("/tasks", task);
app.use("/users", user);

app.listen(HTTP_PORT, () =>
  console.log(`Server started listening on ${HTTP_PORT}`)
);
