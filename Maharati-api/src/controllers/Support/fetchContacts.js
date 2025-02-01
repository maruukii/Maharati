const contactService = require("../../services/Support/fetchContacts");

async function fetchContacts(req, res) {
  try {
    const { page, limit } = req.query;
    if (page && limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      // Calculate the skip value
      const skip = (page - 1) * limit;
      const { total, contacts } = await contactService.fetchContacts(
        limit,
        skip,
        req.params.status
      );
      return res.json({
        contacts,
        pagination: {
          total: total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
      });
    }
    const contacts = await contactService.fetchContacts(
      null,
      null,
      req.params.status
    );
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ message: "Error fetching Contacts" });
  }
}
async function fetchContact(req, res) {
  try {
    const contact = await contactService.fetchContact(req.params.id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Contact" });
  }
}
module.exports = { fetchContacts, fetchContact };
