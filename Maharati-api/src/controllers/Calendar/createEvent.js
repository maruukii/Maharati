const eventService = require("../../services/Calendar/createEvent");

async function createEvent(req, res) {
  try {
    const eventData = req.body;

    const event = await eventService.createEvent(eventData);
    res
      .status(201)
      .json({ event: event, message: "Event Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { createEvent };
