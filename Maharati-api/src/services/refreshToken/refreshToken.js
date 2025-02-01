const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { generateToken } = require("../../utils/jwtUtils.js");

async function refreshToken(cookies) {
  if (!cookies?.jwt) throw new Error("No refresh token provided");

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  if (!foundUser) throw new Error("User not found");
  // Verify JWT
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return reject(new Error("Forbidden"));
        }
        const token = generateToken(foundUser);
        resolve({ token, foundUser });
      }
    );
  });
}

module.exports = { refreshToken };
