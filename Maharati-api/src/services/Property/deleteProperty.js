const Property = require("../../models/property.js");

async function deleteProperty(PropertyID) {
  try {
    const property = await Property.findByIdAndDelete(PropertyID);

    return property;
  } catch (error) {
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteProperty };
