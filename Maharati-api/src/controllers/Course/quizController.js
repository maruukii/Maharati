const mongoose = require("mongoose");
const Course = require("../../models/course");

const addQuizToChapter = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    const { text, options, correctAnswer } = req.body;

    // Validate course ID and chapter ID
    if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(chapterId)) {
      throw new Error("Invalid course ID or chapter ID");
    }

    // Find the course and chapter
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const chapter = course.Chapters.id(chapterId);
    if (!chapter) {
      throw new Error("Chapter not found");
    }

    // Add quiz to the chapter
    chapter.Quizzs.push({ text, options, correctAnswer });
    await course.save();

    res.status(200).json({ message: "Quiz added successfully", course });
  } catch (error) {
    console.error("Error adding quiz to chapter:", error);
    res.status(500).json({ message: "Error adding quiz to chapter", error: error.message });
  }
};

module.exports = { addQuizToChapter };
