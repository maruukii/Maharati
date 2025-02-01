const User = require("../../models/user.js");
const bcrypt = require("bcrypt");

async function changePassword(Password, id) {
  try {
    var found = await User.findById(id);
    console.log(found);
    if (!found) {
      throw new Error("User not Found");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    console.log("Password encrypted");
    found.Password = hashedPassword;
    await found.save();
    console.log("Password saved");
    return found.Password === hashedPassword;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Internal Server Error");
  }
}
module.exports = { changePassword };
