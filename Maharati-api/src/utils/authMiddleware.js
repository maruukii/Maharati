const jwt = require("jsonwebtoken");

const ACCESS_secretKey = process.env.JWT_ACCESS_SECRET_KEY;

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format!" });
  }
  const decoded = jwt.decode(token);
  jwt.verify(token, ACCESS_secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err });
    }
    if (decoded) {
      req.user = user;
      req.role = user.Role;
    }
    next();
  });
}
module.exports = { authenticateToken };
