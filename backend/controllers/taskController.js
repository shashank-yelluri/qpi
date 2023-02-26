const {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../utils/dbMethods");

exports.middleware = async (req, res, next, id) => {
  const task = await getTaskById(id);

  if (!task) {
    return res.status(404).json({ status: 404, body: `No task with id ${id}` });
  }

  req.task = task;
  next();
};

exports.getTasks = async (req, res) => {
  let tasks = await listTasks();

  return res.status(200).json({ status: 200, body: tasks });
};

exports.getTask = async (req, res) => {
  return res.status(200).json({ status: 200, body: req.task });
};

exports.createTask = async (req, res) => {
  const { name, status, owner, board } = req.body;
  await createTask(name, status, owner, board);

  return res.status(200).json({ status: 200, body: "Successful" });
};

exports.updateTask = async (req, res) => {
  const { name, status, owner, board } = req.body;
  const { _id } = req.task;

  await updateTask(_id, name, status, owner, board);

  return res.status(200).json({ status: 200, body: "Successful" });
};

exports.deleteTask = async (req, res) => {
  const { task_id } = req.params;

  await deleteTask(task_id);
  return res.status(200).json({ status: 200, body: "Successful" });
};
