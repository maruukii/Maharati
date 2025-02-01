const express = require("express");

const {
  createEvaluation,
} = require("../controllers/Evaluation/createEvaluation");
const {
  updateEvaluation,
} = require("../controllers/Evaluation/updateEvaluation");
const {
  deleteEvaluation,
} = require("../controllers/Evaluation/deleteEvaluation");
const {
  fetchEvaluations,
  fetchEvaluation,
} = require("../controllers/Evaluation/evaluationsFetch");
const authMiddleware = require("../utils/authMiddleware");
const { verifyRole, ROLES } = require("../utils/VerifyRole");

const router = express.Router();

router.post(
  "/new",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  createEvaluation
);
router.put(
  "/update/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  updateEvaluation
);
router.delete(
  "/delete/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  deleteEvaluation
);
router.get(
  "/",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  fetchEvaluations
);
router.get(
  "/:id",
  authMiddleware.authenticateToken,
  verifyRole(ROLES.ADMIN, ROLES.INSTRUCTOR),
  fetchEvaluation
);
module.exports = router;
