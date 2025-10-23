const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
// const property = require("./property.js");

const ElementSchema = new Schema({
  type: {
    type: String,
    default: "node",
  },
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  bpmnType: {
    type: String,
    default: "bpmn:ServiceTask",
  },
  groups: {
    type: String,
  },
  icon: {
    type: { ImageName: String, ImageLink: String },
  },
  width: {
    type: Number,
  },
  height: { type: Number },
  eventDefinitionType: {
    type: String,
  },
  flowableType: {
    type: String,
  },
  propertyPackages: {
    type: [String],
    // ref: property,
    default: [],
  },
  createdAt: {
    type: String,
    default: () => moment().format("YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
  modifiedAt: {
    type: String,
  },
});

ElementSchema.pre("save", async function (next) {
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

ElementSchema.post("save", function (doc, next) {
  console.log("Element saved ");
  next();
});

const Element = mongoose.model("Element", ElementSchema);

module.exports = Element;
