const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const Instructor = require("./user");
const Evaluation = require("./evaluation");
const chapterSchema = require("./chapter");

const CourseSchema = new Schema({
  CourseName: {
    type: String,
    //required: [true, "Please Enter Course name"],
  },
  CoursePrice: {
    type: Number,
    //required: [true, "Please Enter Course Prix"],
  },
  CourseType: {
    type: String,
    enum: ["Static", "Live"],
    default: "Static",
  },
  CourseLevel: {
    type: String,
    //required: [true, "Please Enter Course Level"],
  },
  CourseDescription: {
    type: String,
    //required: [true, "Please Enter Course description"],
  },
  CourseImage: {
    type: { ImageName: String, ImageLink: String },
    //required: [true, "Please Enter image"],
  },
  CourseDuration: {
    type: String,
    //required: [true, "Please Enter a Valid End date"],
  },
  Chapters: [chapterSchema],
  Final: {
    type: Schema.Types.ObjectId,
    ref: Evaluation,
  },
  Test: {
    type: Schema.Types.ObjectId,
    ref: Evaluation,
  },
  Status: {
    type: Boolean,
    default: true,
  },
  CourseStart: {
    type: String,
    //required: [true, "Please Enter a Valid Start date"],
  },
  Duration: {
    type: String,
    //required: [true, "Please Enter a Valid
  },
  CourseEnd: {
    type: String,
    //required: [true, "Please Enter a Valid End date"],
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: Instructor,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => moment().format("YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
  modifiedAt: {
    type: String,
  },
});

CourseSchema.pre("save", async function (next) {
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

CourseSchema.post("save", function (doc, next) {
  console.log("Course saved ");
  next();
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
