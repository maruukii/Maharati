const Property = require("../../models/property");

async function createProperty(PropertyData) {
  try {
    const { name, properties } = PropertyData;

    const CreatedProperty = new Property({
      name,
      properties,
    });
    const savedProperty = await CreatedProperty.save();
    return savedProperty;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createProperty };
