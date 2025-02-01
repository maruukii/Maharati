const User = require("../../models/user");
const Audit = require("../../models/audit");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  try {
    const {
      Email,
      FirstName,
      LastName,
      Role,
      Password,
      createdBy,
      PhoneNumber,
      Status,
    } = userData;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const CreatedUser = new User({
      Email,
      FirstName,
      LastName,
      Role,
      createdBy,
      Password: hashedPassword,
      PhoneNumber,
      Status,
    });
    const savedUser = await CreatedUser.save();
    const log = new Audit({
      type: "User Added",
      doneBy: createdBy,
      On: savedUser,
    });
    await log.save();
    return savedUser;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createUser };
