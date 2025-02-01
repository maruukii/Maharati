const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const Owner = require("./user");

const EventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Enter Event name"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Event category"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  className: {
    type: String,
  },
  Owner: {
    type: Schema.Types.ObjectId,
    ref: Owner,
  },
  createdAt: {
    type: String,
    default: () =>
      moment().utcOffset("+01:00").format("YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
  modifiedAt: {
    type: String,
  },
});

EventSchema.pre("save", async function (next) {
  try {
    this.modifiedAt = moment()
      .utcOffset("+01:00")
      .format(" YYYY-MM-DD HH:mm:ss [GMT]Z");
    next();
  } catch (error) {
    next(error);
  }

  next();
});

EventSchema.post("save", function (doc, next) {
  console.log("Event saved ");
  next();
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
