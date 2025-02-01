const authService = require("../../services/Auth/login");

async function login(req, res) {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const { cred, Password } = req.body;
    const { token, refresh, found } = await authService.login(cred, Password);
    res.cookie("jwt", refresh, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: isProduction,
      sameSite: isProduction ? "none" : "",
    });
    res.json({ user: found, accessToken: token, refreshToken: refresh });
  } catch (error) {
    res.status(401).json(error.message);
  }
}
module.exports = { login };
