const Course = require("../../models/course");

async function fetchCourses() {
  try {
    const courses = await Course.find().populate("createdBy");
    return courses;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchCourse(courseID) {
  try {
    const course = await Course.findById(courseID);
    return course;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchCoursesByUser(userId) {
  try {
    const courses = await Course.find({ createdBy: userId });
    return courses;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
module.exports = { fetchCourses, fetchCourse, fetchCoursesByUser };
