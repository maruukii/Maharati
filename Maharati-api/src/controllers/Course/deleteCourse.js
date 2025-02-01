const courseService = require("../../services/Course/deleteCourse");
async function deleteCourse(req, res) {
  try {
    const doneBy = req.query.doneBy;

    const course = await courseService.deleteCourse(doneBy, req.params.id);
    res.status(200).json({ message: "Course Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteCourse };
