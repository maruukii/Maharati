const Event = require("../../models/calendar");

async function deleteEvent(eventID) {
  try {
    const event = await Event.findByIdAndDelete(eventID);
    return event;
  } catch (error) {
    console.error("Error Deleting Data:", error.message);
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteEvent };
