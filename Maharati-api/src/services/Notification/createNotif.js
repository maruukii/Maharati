const User = require("../../models/user");

async function createNotif(userId, notifData) {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.Notifications.push(notifData);
      await user.save();
    }
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createNotif };
