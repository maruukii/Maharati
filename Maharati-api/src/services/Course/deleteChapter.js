const mongoose = require("mongoose");
const Course = require("../../models/course");

async function deleteChapter(courseId, chapterId) {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { Chapters: { _id: chapterId } },
      },
      { new: true }
    );
    if (!updatedCourse) {
      console.log("Course not found");
      return;
    }
  } catch (error) {
    console.error("Error deleting chapter:", error);
  }
}
module.exports = { deleteChapter };
