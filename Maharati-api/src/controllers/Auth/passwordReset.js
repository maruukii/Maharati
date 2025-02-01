const passwordService = require("../../services/Auth/passwordReset");

async function resetPassword(req, res) {
  try {
    const { id, token } = req.params;
    const verify = await passwordService.resetPassword(id, token);
    res.redirect(`${process.env.CLIENT_URL}/reset-password?id=${id}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/forgot-password?token=expired`);
    res.status(401).json({ message: error.message });
  }
}
module.exports = { resetPassword };
