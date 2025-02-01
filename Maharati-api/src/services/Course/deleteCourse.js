const Course = require("../../models/course");
const Audit = require("../../models/audit");

async function deleteCourse(doneBy, courseID) {
  try {
    const course = await Course.findByIdAndDelete(courseID);
    const log = new Audit({
      type: "Course Deleted",
      doneBy: doneBy,
      On: course,
    });
    await log.save();
    return course;
  } catch (error) {
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteCourse };
