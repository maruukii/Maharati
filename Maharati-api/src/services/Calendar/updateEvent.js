const Event = require("../../models/calendar");

async function updateEvent(eventData, eventID) {
  try {
    const event = await Event.findById(eventID);
    if (eventData.category === "bg-dark") {
      event.status = "Canceled";
    } else {
      event.status = "Scheduled";
    }

    if (eventData.title) {
      event.title = eventData.title;
    }
    if (eventData.description || eventData.description === "") {
      event.description = eventData.description;
    }
    if (eventData.start || eventData.start === "") {
      event.start = eventData.start;
    }
    if (eventData.end || eventData.end === "") {
      event.end = eventData.end;
    }

    if (eventData.className) {
      event.className = eventData.className;
    }

    if (eventData.category) {
      event.category = eventData.category;
    }
    event.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { updateEvent };
