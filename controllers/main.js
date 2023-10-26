const { BadRequest } = require("../errors");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide the required credentials");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({ msg: `User created`, token }).status(200);
};

const dashboard = async (req, res) => {
  const { id, username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${username}, welcome`,
    secret: `your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
