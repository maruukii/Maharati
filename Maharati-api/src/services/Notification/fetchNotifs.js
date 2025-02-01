const User = require("../../models/user");
const moment = require("moment-timezone");

async function fetchNewNotifs(userId) {
  try {
    let New = 0;
    const notifs = [];
    const currentDate = new Date();
    const user = await User.findOne({ _id: userId });
    if (user && Array.isArray(user.Notifications)) {
      user.Notifications.forEach((notification) => {
        if (!notification.viewedAt) {
          notifs.push(notification);
          New = New + 1;
        } else {
          const diffInMilliseconds =
            currentDate.getTime() - notification.viewedAt.getTime();
          const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
          if (diffInHours <= 24) {
            notifs.push(notification);
          }
        }
      });
    }
    return { notifs, newNotifs: New };
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
// async function fetchEvaluation(evaluationID) {
//   try {
//     const evaluation = await Evaluation.findById(evaluationID);
//     return evaluation;
//   } catch (error) {
//     console.error("Error Fetching Data:", error.message);
//     throw new Error("Error Fetching Data");
//   }
// }
module.exports = { fetchNewNotifs };
