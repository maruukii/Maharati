const Element = require("../../models/element");

async function createElement(ElementData, ElementImage) {
  try {
    const {
      id,
      title,
      type,
      description,
      width,
      height,
      eventDefinitionType,
      flowableType,
      propertyPackages,
      groups,
    } = ElementData;
    const CreatedElement = new Element({
      id,
      title,
      groups,
      icon: ElementImage,
      type,
      description,
      width,
      height,
      eventDefinitionType,
      flowableType,
      propertyPackages,
    });
    const savedElement = await CreatedElement.save();

    return savedElement;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createElement };
