const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Not authorized. No Token" });
  }
  if (req.headers.authorization.startsWith("Bearer ")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Wrong or expired token" });
      } else {
        req.user = data; //object with the id and email of the user
        next();
      }
    });
  }
};

module.exports = verifyToken;
