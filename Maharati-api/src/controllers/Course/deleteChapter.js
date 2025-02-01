const courseService = require("../../services/Course/deleteChapter");
async function deleteChapter(req, res) {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    const course = await courseService.deleteChapter(courseId, chapterId);
    res.status(200).json({ message: "Chapter Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteChapter };
