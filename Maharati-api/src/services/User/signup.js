const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwtUtils.js");
const { sendMail } = require("../Mail/sendMail.js");
async function signup(userData) {
  try {
    const { Email, FirstName, LastName, Role, Password, PhoneNumber } =
      userData;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const CreatedUser = new User({
      Email,
      FirstName,
      LastName,
      Role,
      Password: hashedPassword,
      PhoneNumber,
    });
    const savedUser = await CreatedUser.save();

    const token = generateToken(savedUser);

    return { savedUser, token };
  } catch (error) {
    throw new Error(error);
  }
}

async function activate(user, token) {
  try {
    const link = `${process.env.HOST}/activate-account/${user._id}/${token}`;
    const destination = user.Email;
    const subject = "Activate your account";
    const content = `<p>Hey there ${user.FirstName}! Thank you for registering with us. Please click the button below to activate your account.`;
    sendMail(destination, subject, [content, link]);
  } catch (error) {
    throw new Error(error);
  }

  return "Email sent";
}
module.exports = { signup, activate };
