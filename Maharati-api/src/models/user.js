const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const notificationSchema = require("./notification");
const UserSchema = new Schema({
  Email: {
    type: String,
    unique: true,
    required: [true, "Please Enter your Email"],
  },
  FirstName: {
    type: String,
    required: [true, "Please Enter your First Name"],
  },
  LastName: {
    type: String,
    required: [true, "Please Enter your Last Name"],
  },
  Role: {
    type: String,
    enum: ["Admin", "User", "Instructor"],
    default: "User",
  },
  Gender: {
    type: String,
    enum: ["Male", "Female", "N/D"],
    default: "N/D",
  },
  LearningLanguage: {
    type: String,
    enum: ["Arabic", "English", "French"],
  },
  Address: {
    type: { street: String, city: String, state: String, zipCode: String },
  },
  DateofBirth: {
    type: Date,
  },

  Avatar: {
    type: String,
  },
  GoogleId: {
    type: String,
  },
  FacebookId: {
    type: String,
  },
  LinkedinId: {
    type: String,
  },
  GithubId: {
    type: String,
  },
  Provider: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  Status: {
    type: Boolean,
    default: false,
  },
  Password: {
    type: String,
  },
  PhoneNumber: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: String,
    default: () =>
      moment().utcOffset("+01:00").format("YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
  modifiedAt: {
    type: String,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  Notifications: {
    type: [notificationSchema],
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  try {
    this.modifiedAt = moment()
      .utcOffset("+01:00")
      .format("YYYY-MM-DD HH:mm:ss [GMT]Z");
    next();
  } catch (error) {
    next(error);
  }

  next();
});

UserSchema.post("save", function (doc, next) {
  console.log("User saved ");
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
