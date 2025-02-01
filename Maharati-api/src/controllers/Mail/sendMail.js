const mailService = require("../../services/Mail/sendMail");

async function composeMail(req, res) {
  try {
    const { destination, subject, content } = req.body;
    const result = await mailService.composeMail(destination, subject, content);

    res.status(200);
  } catch (error) {
    console.error(error.message);
    res.status(401);
  }
}

module.exports = { composeMail };
