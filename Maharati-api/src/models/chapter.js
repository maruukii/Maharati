const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Quiz Option Schema
const quizOptionSchema = new Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: [arrayLimit, "{PATH} must have at least two options"],
  },
  correctAnswer: { type: String, required: true },
});

// Custom array length validator
function arrayLimit(val) {
  return val.length >= 2; // Ensure at least two options
}

// Define Content Schema
const contentSchema = new Schema({
  type: {
    type: String,
    enum: [
      "Text",
      "Quiz",
      "Video",
      "Photo",
      "Heading3",
      "Heading2",
      "Heading1",
    ],
    required: true,
  },
  value: {
    type: Schema.Types.Mixed, // Use Mixed type to accommodate different structures
    required: true,
    validate: {
      validator: function (v) {
        // Validation based on type
        if (
          this.type === "Text" ||
          this.type === "Heading1" ||
          this.type === "Heading2" ||
          this.type === "Heading3"
        ) {
          return typeof v === "string" && v.trim() !== ""; // Ensure non-empty string
        } else if (this.type === "Quiz") {
          // Ensure value is an array of quiz objects
          return (
            Array.isArray(v) &&
            v.every(
              (quiz) =>
                typeof quiz.question === "string" &&
                Array.isArray(quiz.options) &&
                quiz.options.length >= 2 && // Ensure there are at least 2 options
                new Set(quiz.options).size === quiz.options.length && // Ensure unique options
                typeof quiz.correctAnswer === "string"
            )
          );
        } else if (this.type === "Photo" || this.type === "Video") {
          // Allow empty value but also accept a non-empty string
          return typeof v === "string" || v === ""; // Accept empty string
        }
        return false;
      },
      message: (props) => {
        const type = props.instance ? props.instance.type : "unknown";
        return `${JSON.stringify(
          props.value
        )} is not a valid content value for type ${type}`;
      },
    },
  },
});
const quizSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
// Define Chapter Schema
const chapterSchema = new Schema({
  ChapterPhoto: String,
  ChapterTitle: { type: String }, // Ensure title is always provided
  ChapterVideo: String,
  ChapterContent: [contentSchema], // Validate that ChapterContent is an array of `contentSchema`
  Files: [String], // Files should be an array of strings

  Quizzs: [quizSchema],
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
});

module.exports = chapterSchema;
