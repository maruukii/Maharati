const verificationService = require("../../services/User/activateAccount");

async function activateAccount(req, res) {
  try {
    const { id, token } = req.params;
    const verify = await verificationService.activateAccount(id, token);
    res.redirect(`${process.env.CLIENT_URL}/login?activation=success`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/login?activation=fail`);
    res.status(401);
  }
}
module.exports = { activateAccount };
