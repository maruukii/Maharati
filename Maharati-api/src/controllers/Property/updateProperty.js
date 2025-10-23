const PropertyService = require("../../services/Property/updateProperty");
async function updateProperty(req, res) {
  try {
    const PropertyData = req.body;
    console.log(PropertyData);
    const Property = await PropertyService.updateProperty(
      PropertyData,
      req.params.id
    );
    res
      .status(201)
      .json({ Property, message: "Property Modified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { updateProperty };
