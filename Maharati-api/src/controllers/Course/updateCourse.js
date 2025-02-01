const courseService = require("../../services/Course/updateCourse");
async function updateCourse(req, res) {
  try {
    const courseData = req.body;
    const course = await courseService.updateCourse(
      courseData,

      req.params.id
    );
    res.status(201).json({ message: "Course Modified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { updateCourse };
