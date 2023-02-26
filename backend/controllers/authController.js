const { userExists, userEmailPasswordCheck } = require("../utils/dbMethods");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const { JWT_SECRET } = require("../utils/constants");

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({
        status: 403,
        body: `Admin Resource, contact shashank@gmail.com`,
      });
  next();
};

exports.healthCheck = (req, res) => {
  return res.status(200).json({ status: 200, body: "Successful" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userExistsStatus = await userExists(email);
  if (!userExistsStatus)
    return res
      .status(404)
      .json({ status: 404, body: `No user with email '${email}'` });

  const user = await userEmailPasswordCheck(email, password);
  if (!user)
    return res.status(400).json({ status: 400, body: `Incorrect password` });

  const token = jwt.sign({ _id: user._id }, JWT_SECRET);

  return res.status(200).json({
    status: 200,
    body: {
      token,
      user,
    },
  });
};
