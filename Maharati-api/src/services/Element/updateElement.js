const Element = require("../../models/element");

async function updateElement(ElementData, Icon, ElementID) {
  try {
    const element = await Element.findById(ElementID);
    if (ElementData.type) {
      element.type = ElementData.type;
    }
    if (ElementData.id) {
      element.id = ElementData.id;
    }
    if (ElementData.title) {
      element.title = ElementData.title;
    }
    if (ElementData.description) {
      element.description = ElementData.description;
    }
    // if (ElementData.bpmnType) {
    //   element.bpmnType = ElementData.bpmnType;
    // }
    if (ElementData.groups) {
      element.groups = ElementData.groups;
    }
    if (Icon?.ImageLink) {
      element.icon = Icon;
    }
    if (ElementData.width) {
      element.width = ElementData.width;
    }
    if (ElementData.height) {
      element.height = ElementData.height;
    }
    if (ElementData.eventDefinitionType) {
      element.eventDefinitionType = ElementData.eventDefinitionType;
    }
    if (ElementData.flowableType) {
      element.flowableType = ElementData.flowableType;
    }
    if (ElementData.propertyPackages) {
      element.propertyPackages = ElementData.propertyPackages;
    }

    element.save();
    return element;
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { updateElement };
