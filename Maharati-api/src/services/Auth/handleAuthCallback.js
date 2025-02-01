const passport = require("passport");
function handleAuthCallback(strategyName) {
  return (req, res, next) => {
    passport.authenticate(strategyName, (err, data, info) => {
      if (err) {
        return res.redirect(
          process.env.CLIENT_URL + "/login?error=email_error"
        );
      }
      if (!data) {
        return res.redirect(
          process.env.CLIENT_URL + "/login?error=authentication_failed"
        );
      }

      const { refreshToken } = data;
      const isProduction = process.env.NODE_ENV === "production";

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        secure: isProduction,
        sameSite: "none",
      });

      const from = req.session.from || "/";
      return res.redirect(
        process.env.CLIENT_URL + `/${strategyName}/oauth?from=${from}`
      );
    })(req, res, next);
  };
}
module.exports = { handleAuthCallback };
