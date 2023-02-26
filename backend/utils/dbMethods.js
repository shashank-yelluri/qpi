const User = require("../models/User");
const Task = require("../models/Task");
const connectToDB = require("./dbConnection");

// DB Connection
connectToDB();

/**
 * List the users from the database.
 *
 * @return {array} users.
 */
const listUsers = async () => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.error(error);
  }

  return users;
};

/**
 * Get the user details by id.
 *
 * @param {string} id
 * @return {Object} user.
 */
const getUserById = async (id) => {
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    console.error(error.reason);
  }

  return user;
};

/**
 * Get the user details by name.
 *
 * @param {string} name
 * @return {Object} user.
 */
const getUserByName = async (name) => {
  let user;
  try {
    user = await User.findOne({ name: name });
  } catch (error) {
    console.error(error.response);
  }

  return user;
};

/**
 * List the tasks from the database and process on them.
 *
 * @return {array} tasks.
 */
const listTasks = async () => {
  let tasksResp = [];

  try {
    const tasks = await Task.find();
    for (let index = 0; index < tasks.length; index++) {
      const { owner_id, name, status, board, _id } = tasks[index];
      const user = await getUserById(owner_id);

      tasksResp.push({
        _id,
        name,
        status,
        board,
        owner: user.name,
      });
    }
  } catch (error) {
    console.error(error);
  }

  return tasksResp;
};

/**
 * Get the task details by id.
 *
 * @param {string} id
 * @return {Object} task.
 */
const getTaskById = async (id) => {
  let task;
  try {
    task = await Task.findById(id);
  } catch (error) {
    console.error(error.reason);
  }

  return task;
};

/**
 * Creates the task by taking the required fields.
 *
 * @param {string} name
 * @param {string} status
 * @param {string} owner
 * @param {string} board
 */
const createTask = async (name, status, owner, board) => {
  const user = await getUserByName(owner);

  const newTask = new Task({
    name,
    status,
    owner_id: user._id.toString(),
    board,
  });

  newTask.save((err, result) => {
    if (err) console.error(err);
    console.log(`'${result.name}' created successfully !`);
  });
};

/**
 * Updates the task by taking the required fields.
 *
 * @param {string} id
 * @param {string} name
 * @param {string} status
 * @param {string} owner
 * @param {string} board
 */
const updateTask = async (id, name, status, owner, board) => {
  Task.updateOne({ _id: id }, { name, owner, status, board }, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

/**
 * Deletes the task by taking the required fields.
 *
 * @param {string} id
 */
const deleteTask = async (id) => {
  Task.deleteOne({ _id: id }, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

/**
 * Creates the user by taking the required fields.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} isAdmin
 */
const createUser = async (name, email, password, isAdmin) => {
  const newUser = new User({
    name,
    email,
    password,
    isAdmin,
  });

  newUser.save((err, result) => {
    if (err) console.error(err);
    console.log(`'${result.name}' created successfully !`);
  });
};

/**
 * Creates the user by taking the required fields.
 *
 * @param {Strinf} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @param {string} isAdmin
 */
const updateUser = async (id, name, email, password, isAdmin) => {
  User.updateOne(
    { _id: id },
    { name, email, password, isAdmin },
    (err, result) => {
      if (err) console.error(err);
      console.log(result);
    }
  );
};

/**
 * Deletes the user by taking the required fields.
 *
 * @param {string} id
 */
const deleteUser = async (id) => {
  User.deleteOne({ _id: id }, (err, result) => {
    if (err) console.error(err);
    console.log(result);
  });
};

/**
 * Checks for the user in the DB.
 *
 * @param {String} email
 *
 * @return {Bool} true/false.
 */
const userExists = async (email) => {
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    console.error(error.response);
  }

  if (user) return true;
  return false;
};

/**
 * Checks for the user email and password match in the DB and returns user Obj.
 *
 * @param {String} email
 * @param {String} password
 *
 * @return {Object} user
 */
const userEmailPasswordCheck = async (email, password) => {
  let user;
  try {
    user = await User.findOne({ email: email, password: password });
  } catch (error) {
    console.error(error.response);
  }

  return user;
};

module.exports = {
  listUsers,
  listTasks,
  getTaskById,
  getUserById,
  createTask,
  updateTask,
  deleteTask,
  createUser,
  updateUser,
  deleteUser,
  userExists,
  userEmailPasswordCheck,
};
