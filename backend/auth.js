require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .send({ message: "No authorization header provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).send({ message: "Failed to authenticate token" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
