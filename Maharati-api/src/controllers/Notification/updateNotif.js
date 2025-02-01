const notifService = require("../../services/Notification/updateNotif");
async function setViewed(req, res) {
  try {
    await notifService.setViewed(req.params.userId);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { setViewed };
