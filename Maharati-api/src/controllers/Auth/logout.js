const logoutService = require("../../services/Auth/logout");

async function Logout(req, res) {
  try {
    const cookies = req.cookies;

    const status = await logoutService.Logout(cookies);
    res.clearCookie("jwt", { httpOnly: true });
    res.json({ status });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(401).json({ message: "Invalid refresh token" });
  }
}
module.exports = { Logout };
