const Event = require("../../models/calendar");

async function createEvent(eventData) {
  try {
    let { title, description, category, start, end, className, Owner } =
      eventData;
    let status = "Scheduled";
    if (category === "bg-dark") {
      status = "Canceled";
    }

    const CreatedEvent = new Event({
      title,
      description,
      category,
      status,
      start,
      end,
      className,
      Owner,
    });
    const savedEvent = await CreatedEvent.save();
    return savedEvent;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createEvent };
