const mongoose = require("mongoose");
const moment = require("moment-timezone");
const { Schema } = mongoose;
const User = require("./user");
const Evaluation = require("./evaluation");
const Course = require("./course");

const AuditSchema = new Schema({
  type: { type: String, required: true },
  doneBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  On: { type: Schema.Types.Mixed, required: true },
  At: {
    type: String,
    default: () =>
      moment().utcOffset("+01:00").format("YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
});
const Audit = mongoose.model("Audit", AuditSchema);

module.exports = Audit;
