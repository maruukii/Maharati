const eventService = require("../../services/Calendar/fetchEvents");

async function fetchEvents(req, res) {
  try {
    const events = await eventService.fetchEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Events" });
  }
}
async function fetchEventsByOwner(req, res) {
  try {
    const event = await eventService.fetchEventsByOwner(req.params.owner);
    res.status(200).json(event);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Event" });
  }
}
module.exports = { fetchEvents, fetchEventsByOwner };
