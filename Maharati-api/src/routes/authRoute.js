const express = require("express");
const { login } = require("../controllers/Auth/login");
const { signup, activate } = require("../controllers/User/signup");
const { forgotPassword } = require("../controllers/Auth/forgotPassword");
const { resetPassword } = require("../controllers/Auth/passwordReset");
const { activateAccount } = require("../controllers/User/activateAccount");
const { Logout } = require("../controllers/Auth/logout");
const { changePassword } = require("../controllers/Auth/changePassword");
const { handleAuthCallback } = require("../services/Auth/handleAuthCallback");
const passport = require("passport");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", Logout);
router.post("/activate", activate);
router.get("/activate-account/:id/:token", activateAccount);
router.post("/forgot-password/:Email", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);
router.put("/change-password", changePassword);

// Oauth
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    if (req.query.from) {
      req.session.from = req.query.from;
    }
    next();
  },
  handleAuthCallback("google")
);

router.get(
  "/auth/facebook/callback",
  (req, res, next) => {
    if (req.query.from) {
      req.session.from = req.query.from;
    }
    next();
  },
  handleAuthCallback("facebook")
);
router.get(
  "/auth/github/callback",
  (req, res, next) => {
    if (req.query.from) {
      req.session.from = req.query.from;
    }
    next();
  },
  handleAuthCallback("github")
);
router.get(
  "/auth/linkedin/callback",
  (req, res, next) => {
    if (req.query.from) {
      req.session.from = req.query.from;
    }
    next();
  },
  handleAuthCallback("linkedin")
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

module.exports = router;
