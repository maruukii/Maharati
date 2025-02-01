const notifService = require("../../services/Notification/fetchNotifs");

async function fetchNewNotifs(req, res) {
  try {
    const userId = req.params.userId;
    const notifs = await notifService.fetchNewNotifs(userId);
    res.status(200).json(notifs);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Notifs" });
  }
}
async function fetchNotif(req, res) {
  try {
    const notif = await notifService.fetchNotif(
      req.params.userId,
      req.params.id
    );
    res.status(200).json(notif);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Notif" });
  }
}
module.exports = { fetchNewNotifs, fetchNotif };
