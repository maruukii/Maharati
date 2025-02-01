const Contact = require("../../models/contact");

async function deleteContact(contactID) {
  try {
    const contact = await Contact.findByIdAndDelete(contactID);
    return contact;
  } catch (error) {
    console.error("Error Deleting Data:", error.message);
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteContact };
