const mongoose = require("mongoose");

// Define the schema for TestFinal
const testFinalSchema = new mongoose.Schema(
  {
    courseID: { type: String, required: true },
    courseName: { type: String, required: true },
    Quizzs: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        score: { type: Number, required: true, min: 0, max: 20 },
      },
    ],
  },
  {
    timestamps: true, // Optional: automatically manage createdAt and updatedAt fields
  }
);

// Create the model
const TestFinalModel = mongoose.model("TestFinal", testFinalSchema);

module.exports = TestFinalModel;
