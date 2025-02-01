const contactService = require("../../services/Support/deleteContact");
async function deleteContact(req, res) {
  try {
    const contact = await contactService.deleteContact(req.params.id);
    res
      .status(201)
      .json({ message: "Contact Deleted Successfully", contact: contact });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteContact };
