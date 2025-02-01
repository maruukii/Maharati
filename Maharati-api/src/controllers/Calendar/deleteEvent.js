const eventService = require("../../services/Calendar/deleteEvent");
async function deleteEvent(req, res) {
  try {
    const event = await eventService.deleteEvent(req.params.id);
    res
      .status(201)
      .json({ message: "Event Deleted Successfully", event: event });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteEvent };
