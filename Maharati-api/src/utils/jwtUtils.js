const jwt = require("jsonwebtoken");

const ACCESS_secretKey = process.env.JWT_ACCESS_SECRET_KEY;
const REFRESH_secretKey = process.env.JWT_REFRESH_SECRET_KEY;

function generateToken(user) {
  const payload = {
    id: user._id,
    Email: user.Email,
    Role: user.Role,
  };

  return jwt.sign(payload, ACCESS_secretKey, { expiresIn: "5m" });
}
function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    Email: user.Email,
    Role: user.Role,
  };

  return jwt.sign(payload, REFRESH_secretKey, { expiresIn: "1d" });
}
module.exports = {
  generateToken,
  generateRefreshToken,
};
