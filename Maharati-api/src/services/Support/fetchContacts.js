const Contact = require("../../models/contact");

async function fetchContacts(limit, skip, status) {
  try {
    if (limit !== null) {
      if (status === "All") {
        const contacts = await Contact.find().skip(skip).limit(limit);
        total = await Contact.countDocuments();
        return { total, contacts };
      } else {
        const contacts = await Contact.find({ Status: status })
          .skip(skip)
          .limit(limit);
        total = await Contact.countDocuments({ Status: status });
        return { total, contacts };
      }
    }
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchContact(contactID) {
  try {
    const contact = await Contact.findById(contactID);
    return contact;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
module.exports = { fetchContacts, fetchContact };
