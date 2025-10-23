const Element = require("../../models/element.js");

async function deleteElement(ElementID) {
  try {
    const element = await Element.findByIdAndDelete(ElementID);

    return element;
  } catch (error) {
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteElement };
