const {
  getUserById,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../utils/dbMethods");

exports.middleware = async (req, res, next, id) => {
  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({ status: 404, body: `No user with id ${id}` });
  }

  req.user = user;
  next();
};

exports.getUsers = async (req, res) => {
  let users = await listUsers();

  return res.status(200).json({ status: 200, body: users });
};

exports.getUser = async (req, res) => {
  return res.status(200).json({ status: 200, body: req.user });
};

exports.createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  await createUser(name, email, password, isAdmin);

  return res.status(200).json({ status: 200, body: "Successful" });
};

exports.updateUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const { _id } = req.user;

  await updateUser(_id, name, email, password, isAdmin);
  return res.status(200).json({ status: 200, body: "Successful" });
};

exports.deleteUser = async (req, res) => {
  const { _id } = req.user;

  await deleteUser(_id);
  return res.status(200).json({ status: 200, body: "Successful" });
};
