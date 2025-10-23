const PropertyService = require("../../services/Property/createProperty");

async function createProperty(req, res) {
  try {
    const PropertyData = req.body;
    const Property = await PropertyService.createProperty(PropertyData);
    res
      .status(200)
      .json({ Property, message: "Property Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

module.exports = { createProperty };
