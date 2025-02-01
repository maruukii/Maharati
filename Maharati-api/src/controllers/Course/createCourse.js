const courseService = require("../../services/Course/createCourse");
const cloudinary = require("../../utils/cloudinary");

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    let uploadedResponse = null;
    if (courseData.CourseImage) {
      uploadedResponse = await cloudinary.uploader.upload(
        courseData.CourseImage,
        {
          upload_preset: "maharat",
        }
      );
    }
    const course = await courseService.createCourse(courseData, {
      ImageName: courseData.ImageName,
      ImageLink: uploadedResponse?.secure_url,
    });
    res.status(200).json({ course, message: "Course Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

module.exports = { createCourse };
