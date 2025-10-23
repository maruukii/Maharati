const PropertyService = require("../../services/Property/deleteProperty");
async function deleteProperty(req, res) {
  try {
    const Property = await PropertyService.deleteProperty(req.params.id);
    res.status(200).json({ message: "Property Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteProperty };
