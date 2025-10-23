const Property = require("../../models/property");

async function fetchProperties() {
  try {
    const properties = await Property.find();
    return properties;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchProperty(PropertyID) {
  try {
    const property = await Property.findById(PropertyID);
    return property;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}

module.exports = { fetchProperties, fetchProperty };
