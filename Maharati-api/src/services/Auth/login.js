const User = require("../../models/user.js");
const bcrypt = require("bcrypt");
const {
  generateToken,
  generateRefreshToken,
} = require("../../utils/jwtUtils.js");

async function login(cred, password) {
  try {
    var found = await User.findOne({ Email: cred });
    if (found === null) {
      try {
        found = await User.findOne({ PhoneNumber: cred });
      } catch (error) {
        console.log(error);
      }
    }
    if (!found) {
      throw new Error("User not Found");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, found.Password);
      if (isPasswordMatch) {
        const token = generateToken(found);
        const refresh = generateRefreshToken(found);
        found.refreshToken = refresh;
        found.save();
        return { token, refresh, found };
      } else {
        throw new Error("Wrong Password");
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
}
module.exports = { login };
