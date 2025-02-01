const eventService = require("../../services/Calendar/updateEvent");
async function updateEvent(req, res) {
  try {
    const eventData = req.body;
    const event = await eventService.updateEvent(eventData, req.params.id);
    res
      .status(201)
      .json({ event: event, message: "Event Modified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { updateEvent };
