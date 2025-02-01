const express = require("express");
const { updateUser } = require("../controllers/User/updateUser");
const { deleteUser } = require("../controllers/User/deleteUser");
const {
  fetchUsers,
  fetchUser,
  fetchUserByEmail,
  fetchUserByPhone,
} = require("../controllers/User/usersFetch");
const { editProfile } = require("../controllers/User/editProfile");
const { createUser } = require("../controllers/User/createUser");
const authMiddleware = require("../utils/authMiddleware");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

const router = express.Router();
router.post(
  "/new",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  createUser
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  updateUser
);
router.put("/edit-profile", authMiddleware.authenticateToken, editProfile);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  deleteUser
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  fetchUsers
);
router.get("/email/:email", fetchUserByEmail);
router.get("/phone/:phone", fetchUserByPhone);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN),
  fetchUser
);
router.get("/instructor/:id", fetchUser);
module.exports = router;
