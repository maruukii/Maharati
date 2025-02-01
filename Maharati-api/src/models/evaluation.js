const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const Instructor = require("./user");
// const Course = require("./course");

const EvaluationSchema = new Schema({
  EvaluationName: {
    type: String,
    required: [true, "Please Enter Evaluation name"],
  },
  EvaluationDescription: {
    type: String,
    required: [true, "Please Enter Evaluation description"],
  },
  // Course:{
  //     type: Schema.Types.ObjectId,
  //     ref: Course
  // },
  Content: {
    type: [
      {
        Question: String,
        Answers: [String],
        CorrectAnswer: String,
        Explication: String,
      },
    ],
  },
  EvaluationType: {
    type: String,
    enum: ["Quizz", "Test", "Final"],
    default: "Quizz",
    required: [true, "Please Choose an Evaluation Type"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: Instructor,
  },
  createdAt: {
    type: String,
    default: () =>
      moment().utcOffset("+01:00").format("dddd, YYYY-MM-DD HH:mm:ss [GMT]Z"),
  },
  modifiedAt: {
    type: String,
  },
});

EvaluationSchema.pre("save", async function (next) {
  try {
    this.modifiedAt = moment()
      .utcOffset("+01:00")
      .format("dddd, YYYY-MM-DD HH:mm:ss [GMT]Z");
    next();
  } catch (error) {
    next(error);
  }

  next();
});

EvaluationSchema.post("save", function (doc, next) {
  console.log("Evaluation saved ");
  next();
});

const Evaluation = mongoose.model("Evaluation", EvaluationSchema);

module.exports = Evaluation;
