const SupportService = require("../../services/Support/contactUs");

async function contactUs(req, res) {
  try {
    const contactData = req.body;

    const contact = await SupportService.contactUs(contactData);
    res
      .status(201)
      .json({
        contact: contact,
        message: "Contact saved and mail sent successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { contactUs };
