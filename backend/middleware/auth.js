require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer");
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

//storage fileFilter and Upload are needed to upload product image
function upload() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const middleware = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).single("image");

  return middleware;
}

module.exports = authenticateJWT;
