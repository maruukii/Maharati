const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const ContactSchema = new Schema({
  Email: {
    type: String,
    required: [true, "Please Enter your Email"],
  },
  FullName: {
    type: String,
    required: [true, "Please Enter your Full Name"],
  },
  Subject: {
    type: String,
    required: [true, "Please Enter Subject"],
  },
  Content: {
    type: String,
    required: [true, "Please Enter Details"],
  },
  Reply: {
    type: String,
  },
  Read: {
    type: Boolean,
    default: false,
  },
  Preference: {
    type: String,
    enum: ["Email", "Phone"],
    default: "Email",
  },
  Status: {
    type: String,
    enum: ["Solved", "In progress", "Unsolved"],
    default: "Unsolved",
  },
  PhoneNumber: {
    type: String,
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

ContactSchema.pre("save", async function (next) {
  // this.Password = generateRandomPassword();
  // console.log(this.Password);
  try {
    this.modifiedAt = moment()
      .utcOffset("+01:00")
      .format("YYYY-MM-DD HH:mm:ss [GMT]Z");
    next();
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }

  next();
});

ContactSchema.post("save", function (doc, next) {
  console.log("Contact saved ");
  next();
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
