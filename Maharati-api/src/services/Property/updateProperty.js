const Property = require("../../models/property");

async function updateProperty(PropertyData, PropertyID) {
  try {
    const property = await Property.findById(PropertyID);

    if (PropertyData.name) {
      property.name = PropertyData.name;
    }
    if (PropertyData.properties) {
      property.properties = PropertyData.properties;
    }
    property.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { updateProperty };
