const Element = require("../../models/element");

async function fetchElements() {
  try {
    const elements = await Element.find();
    return elements;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchElement(ElementID) {
  try {
    const element = await Element.findById(ElementID);
    return element;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}

module.exports = { fetchElements, fetchElement };
