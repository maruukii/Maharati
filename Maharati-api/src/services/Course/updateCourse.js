const Course = require("../../models/course");
const Audit = require("../../models/audit");

async function updateCourse(courseData, courseID) {
  try {
    const course = await Course.findById(courseID);

    if (courseData.Status) {
      course.Status = courseData.Status;
    }
    if (courseData.CoursePrice) {
      course.CoursePrice = courseData.CoursePrice;
    }
    if (courseData.CourseLevel) {
      course.CourseLevel = courseData.CourseLevel;
    }
    if (courseData.CourseType) {
      course.CourseType = courseData.CourseType;
    }
    if (courseData.CourseDuration) {
      course.CourseDuration = courseData.CourseDuration;
    }
    if (courseData.CourseImage) {
      course.CourseImage = courseData.CourseImage;
    }
    if (courseData.CourseDescription) {
      course.CourseDescription = courseData.CourseDescription;
    }
    if (courseData.CourseName) {
      course.CourseName = courseData.CourseName;
    }
    if (courseData.Content) {
      course.Content = courseData.Content;
    }
    if (courseData.Final) {
      course.Final = courseData.Final;
    }
    if (courseData.Test) {
      course.Test = courseData.Test;
    }
    if (courseData.CourseStart) {
      course.CourseStart = courseData.CourseStart;
    }
    if (courseData.CourseEnd) {
      course.CourseEnd = courseData.CourseEnd;
    }

    course.save();
    const log = new Audit({
      type: "Course Updated",
      doneBy: courseData.doneBy,
      On: course,
    });
    await log.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { updateCourse };
