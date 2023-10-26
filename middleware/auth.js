const jwt = require("jsonwebtoken");
const { UnAuthenticated } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticated("No token provided ");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticated("User not Autherised to make a request for data");
  }
};

module.exports = authMiddleware;
