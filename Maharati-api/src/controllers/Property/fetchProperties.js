const PropertyService = require("../../services/Property/fetchProperties");

async function fetchProperties(req, res) {
  try {
    const properties = await PropertyService.fetchProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Properties" });
  }
}

async function fetchProperty(req, res) {
  try {
    const Property = await PropertyService.fetchProperty(req.params.id);
    if (!Property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(Property);
  } catch (error) {
    console.error("Error Fetching Property:", error.message);
    res.status(500).json({ message: "Error fetching Property" });
  }
}

module.exports = { fetchProperties, fetchProperty };
