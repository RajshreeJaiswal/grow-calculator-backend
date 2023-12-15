const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ status: "Please Login First" });
  }
  const token = authToken.split(" ")[1];
  const secretKey=12345;
  jwt.verify(token, "secretKey", function (err, decoded) {
    if (err) {
      return res.json({ status: "Please Login First" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authentication };
