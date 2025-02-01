const User = require("../../models/user.js");
const { generateToken } = require("../../utils/jwtUtils.js");
const { sendMail } = require("../Mail/sendMail.js");
async function forgotPassword(email) {
  try {
    var found = await User.findOne({ Email: email });
    if (!found) {
      throw new Error("User not Found");
    }
    const token = generateToken(found);
    const link = `${process.env.HOST}/reset-password/${found._id}/${token}`;
    const subject = "Reset your password";
    const content = `<p>You requested to reset your password for your Maharati account. Please click the button below to reset it.</p>
    <p>If you did not request a password reset, please contact us immediately and consider updating your account credentials.</p>`;
    sendMail(email, subject, [content, link]);
    return link;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Internal Server Error");
  }
}
module.exports = { forgotPassword };
