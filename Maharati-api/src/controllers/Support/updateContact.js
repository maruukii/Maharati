const contactService = require("../../services/Support/updateContact.js");
async function setRead(req, res) {
  try {
    const set = await contactService.setRead(req.params.id);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
async function updateContact(req, res) {
  try {
    const data = req.body;
    const updated = await contactService.updateContact(req.params.id, data);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { setRead, updateContact };
