const Course = require("../../models/course");
const Audit = require("../../models/audit");

async function createCourse(courseData, CourseImage) {
  try {
    const {
      CourseName,
      createdBy,
      CoursePrice,
      CourseLevel,
      CourseType,
      CourseDescription,
      chapterData,
      CourseStart,
      CourseEnd,
      CourseDuration,
    } = courseData;

    const CreatedCourse = new Course({
      CourseName,
      CoursePrice,
      CourseLevel,
      CourseImage,
      CourseType,
      createdBy,
      CourseDescription,
      chapterData,
      CourseStart,
      CourseEnd,
      CourseDuration,
    });
    const savedCourse = await CreatedCourse.save();
    const log = new Audit({
      type: "Course Added",
      doneBy: createdBy,
      On: savedCourse,
    });
    await log.save();
    return savedCourse;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createCourse };
