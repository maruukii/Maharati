const ElementService = require("../../services/Element/createElement");
const cloudinary = require("../../utils/cloudinary");

async function createElement(req, res) {
  try {
    const ElementData = req.body;
    let uploadedResponse = null;
    if (ElementData.ElementImage) {
      uploadedResponse = await cloudinary.uploader.upload(
        ElementData.ElementImage,
        {
          upload_preset: "maharat",
        }
      );
    }
    const Element = await ElementService.createElement(ElementData, {
      ImageName: ElementData.ImageName,
      ImageLink: uploadedResponse?.secure_url,
    });
    res.status(200).json({ Element, message: "Element Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
}

module.exports = { createElement };
