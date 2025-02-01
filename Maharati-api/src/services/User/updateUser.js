const User = require("../../models/user");
const Audit = require("../../models/audit");

const bcrypt = require("bcrypt");

async function updateUser(userData, userID) {
  try {
    const user = await User.findById(userID);

    if (userData.Status) {
      user.Status = userData.Status;
    }
    if (userData.Email) {
      user.Email = userData.Email;
    }
    if (userData.FirstName) {
      user.FirstName = userData.FirstName;
    }
    if (userData.LastName) {
      user.LastName = userData.LastName;
    }
    if (userData.Password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userData.Password, salt);
      user.Password = hashedPassword;
    }
    if (userData.PhoneNumber) {
      user.PhoneNumber = userData.PhoneNumber;
    }
    if (userData.Role) {
      user.Role = userData.Role;
    }

    user.save();
    const log = new Audit({
      type: "User Updated",
      doneBy: userData.doneBy,
      On: user,
    });
    await log.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { updateUser };
