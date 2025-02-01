const refreshTokenService = require("../../services/refreshToken/refreshToken");

async function refreshToken(req, res) {
  try {
    const cookies = req.cookies;
    const { token, foundUser } = await refreshTokenService.refreshToken(
      cookies
    );

    res.status(200).json({ token: token, user: foundUser });
  } catch (error) {
    console.error("Error during token refresh:", error.message);
    res.status(401).json({ message: "Invalid refresh token" });
  }
}

module.exports = { refreshToken };
