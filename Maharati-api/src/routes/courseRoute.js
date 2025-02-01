const router = require("express").Router();

const { createCourse } = require("../controllers/Course/createCourse");
const { updateCourse } = require("../controllers/Course/updateCourse");
const { deleteCourse } = require("../controllers/Course/deleteCourse");
const { deleteChapter } = require("../controllers/Course/deleteChapter");
const {
  fetchCourses,
  fetchCourse,
  fetchCoursesByUser,
} = require("../controllers/Course/coursesFetch");
const authMiddleware = require("../utils/authMiddleware");
const addChapter = require("../controllers/Course/addChapter");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

const upload = require("../utils/multerConfig");
const { addQuizToChapter } = require("../controllers/Course/quizController");

router.post(
  "/new",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  createCourse
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  updateCourse
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  deleteCourse
);
router.delete(
  "/delete/chapter/:courseId/:chapterId",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  deleteChapter
);
router.get("/", fetchCourses);
router.get("/user/:userId", fetchCoursesByUser);
router.get("/:id", fetchCourse);
router.post("/:courseId/chapters", upload.array("files"), addChapter);
router.post("/:courseId/chapters/:chapterId/quiz", addQuizToChapter);

module.exports = router;
