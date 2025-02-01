const User = require("../../models/user");
const Audit = require("../../models/audit");

async function deleteUser(doneBy, userID) {
  try {
    const user = await User.findByIdAndDelete(userID);
    const log = new Audit({
      type: "User Deleted",
      doneBy: doneBy,
      On: user,
    });
    await log.save();
    return user;
  } catch (error) {
    console.error("Error Deleting Data:", error.message);
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteUser };
