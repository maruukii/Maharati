const express = require("express");
const router = express.Router();
const TestFinalController = require("../controllers/TestFinalController");
const TestFinalModel = require("../models/TestFinal");

router.post("/new", async (req, res) => {
  const { courseID, courseName, Quizzs } = req.body;

  try {
    // Validate input data
    if (!courseID || !courseName || !Array.isArray(Quizzs)) {
      return res.status(400).json({
        message: "Invalid data: courseID, courseName and Quizzs are required.",
      });
    }

    // Calculate total score
    const totalScore = Quizzs.reduce(
      (sum, quiz) => sum + parseFloat(quiz.score || 0),
      0
    );

    // Ensure the total score does not exceed 20
    if (totalScore > 20) {
      return res.status(400).json({
        message: "Total score for all quizzes cannot exceed 20 points.",
      });
    }

    // Create a new TestFinal instance
    const newTestFinal = new TestFinalModel({ courseID, courseName, Quizzs });

    // Save to the database
    await newTestFinal.save();

    // Return the created object with 201 Created status
    res.status(201).json(newTestFinal);
  } catch (error) {
    console.error("Error creating test:", error);
    res
      .status(500)
      .json({ message: "Error creating test", error: error.message });
  }
});
router.get("/all", TestFinalController.getAllTests);

// Get a single test by ID
router.get("/:id", TestFinalController.getTestById);

// Update a test by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { courseID, courseName, Quizzs } = req.body;

  try {
    // Validate input data
    if (!courseID || !courseName || !Array.isArray(Quizzs)) {
      return res
        .status(400)
        .json({
          message:
            "Invalid data: courseID, courseName and Quizzs are required.",
        });
    }

    // Calculate total score of all quizzes
    const totalScore = Quizzs.reduce((sum, quiz) => sum + quiz.score, 0);

    // Ensure the total score does not exceed 20
    if (totalScore > 20) {
      return res
        .status(400)
        .json({
          message: "Total score for all quizzes cannot exceed 20 points.",
        });
    }

    // Find the test by ID and update it
    const updatedTestFinal = await TestFinalModel.findByIdAndUpdate(
      id,
      { courseID, courseName, Quizzs },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTestFinal) {
      return res.status(404).json({ message: "Test not found." });
    }

    // Return the updated object with 200 OK status
    res.status(200).json(updatedTestFinal);
  } catch (error) {
    console.error("Error updating test:", error);
    res
      .status(500)
      .json({ message: "Error updating test", error: error.message });
  }
});
// Delete a test by ID
router.delete("/tests/:id", TestFinalController.deleteTest);

module.exports = router;
