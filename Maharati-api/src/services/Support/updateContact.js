const Contact = require("../../models/contact");

async function setRead(contactID) {
  try {
    const contact = await Contact.findById(contactID);
    contact.Read = !contact.Read;

    contact.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
async function updateContact(contactID, data) {
  try {
    const contact = await Contact.findById(contactID);
    if (Object.keys(data)[0] == "Status") {
      contact.Status = data.Status;
    }
    if (Object.keys(data)[0] === "Reply") {
      contact.Reply = data.Reply;
      contact.Status = "In progress";
    }
    contact.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { setRead, updateContact };
