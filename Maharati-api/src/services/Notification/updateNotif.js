const User = require("../../models/user");
const moment = require("moment-timezone");

async function setViewed(userId) {
  try {
    let changed = false;
    const user = await User.findById(userId);
    if (user && user.Notifications) {
      user.Notifications.forEach((notification) => {
        if (!notification.viewedAt) {
          notification.viewedAt = new Date();
          changed = true;
        }
      });
      changed && user.save();
    }
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { setViewed };
