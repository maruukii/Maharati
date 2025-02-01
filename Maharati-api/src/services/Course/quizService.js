// const mongoose = require("mongoose");
// const Course = require("../../models/course");
// const Quiz = require("../../models/quiz"); // Assuming you have a Quiz model

// const addQuizToChapter = async (courseId, chapterId, quizData) => {
//   try {
//     // Validate course ID
//     if (!mongoose.Types.ObjectId.isValid(courseId)) {
//       throw new Error("Invalid course ID");
//     }

//     // Validate chapter ID
//     if (!mongoose.Types.ObjectId.isValid(chapterId)) {
//       throw new Error("Invalid chapter ID");
//     }

//     // Create a new quiz
//     const newQuiz = new Quiz(quizData);
//     await newQuiz.save();

//     // Find the course and chapter
//     const course = await Course.findById(courseId);
//     if (!course) {
//       throw new Error("Course not found");
//     }

//     const chapter = course.Chapters.id(chapterId);
//     if (!chapter) {
//       throw new Error("Chapter not found");
//     }

//     // Add the quiz to the chapter
//     chapter.Quizzs.push(newQuiz._id);
//     await course.save();

//     return chapter;
//   } catch (error) {
//     console.error("Error adding quiz to chapter:", error.message);
//     throw error;
//   }
// };

// module.exports = {
//   addQuizToChapter,
// };
