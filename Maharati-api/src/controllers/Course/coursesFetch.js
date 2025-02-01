const courseService = require("../../services/Course/fetchCourses");

async function fetchCourses(req, res) {
  try {
    const courses = await courseService.fetchCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Courses" });
  }
}
async function fetchCoursesByUser(req, res) {
  try {
    const courses = await courseService.fetchCoursesByUser(req.params.userId);
    res.status(200).json(courses);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Courses" });
  }
}
async function fetchCourse(req, res) {
  try {
    const course = await courseService.fetchCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error Fetching Course:", error.message);
    res.status(500).json({ message: "Error fetching Course" });
  }
}

module.exports = { fetchCourses, fetchCourse, fetchCoursesByUser };
