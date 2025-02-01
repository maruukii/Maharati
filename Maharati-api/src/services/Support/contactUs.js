const { sendMail } = require("../Mail/sendMail.js");
const { createNotif } = require("../Notification/createNotif.js");
const Contact = require("../../models/contact");
const userService = require("../../services/User/fetchUsers");

async function contactUs(contactData) {
  try {
    const { FullName, Email, Subject, PhoneNumber, Preference, Content } =
      contactData;
    const contact = new Contact({
      FullName,
      Email,
      Subject,
      PhoneNumber,
      Preference,
      Content,
    });
    const savedContact = await contact.save();

    const Admins = await userService.fetchUserByRole("Admin");
    Admins.map((user) => {
      createNotif(user._id, {
        title: "New Reclamation",
        type: "reclamations",
        detail: "Click to view reclamations",
      });
      const destination = user.Email;
      const subject = `Contact Support: ${Subject}`;
      const content = `<p><Strong>Full name: ${FullName}</Strong><br><Strong>Email: ${Email}</Strong><br><Strong>Phone number: ${PhoneNumber}</Strong><br><Strong>Contact Preference: ${Preference}</Strong><br><br>Content: ${Content}</p>`;
      sendMail(destination, subject, [
        content,
        process.env.CLIENT_URL + "/reclamations",
      ]);
    });

    return savedContact;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { contactUs };
