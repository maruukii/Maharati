const Event = require("../../models/calendar");

async function fetchEvents() {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchEventsByOwner(ownerId) {
  try {
    const event = await Event.find({ Owner: ownerId });
    return event;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
module.exports = { fetchEvents, fetchEventsByOwner };
