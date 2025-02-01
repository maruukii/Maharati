const mongoose = require("mongoose");
const moment = require("moment-timezone");

const notificationSchema = new mongoose.Schema({
  title: String,
  type: String,
  detail: String,
  createdAt: {
    type: String,
    default: () =>
      moment().utcOffset("+01:00").format("YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
  viewedAt: { type: Date },
});
module.exports = notificationSchema;
