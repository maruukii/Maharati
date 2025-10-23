const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const SinglePropertySchema = new Schema(
  {
    type: {
      type: String,
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
    value: {
      type: String,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const PropertySchema = new Schema({
  name: {
    type: String,
  },
  properties: {
    type: [SinglePropertySchema], // ✅ Tableau d’objets
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

PropertySchema.pre("save", async function (next) {
  try {
    this.modifiedAt = moment()
      .utcOffset("+01:00")
      .format("YYYY-MM-DD HH:mm:ss [GMT]Z");
    next();
  } catch (error) {
    next(error);
  }
});

PropertySchema.post("save", function (doc, next) {
  console.log("Property saved");
  next();
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
