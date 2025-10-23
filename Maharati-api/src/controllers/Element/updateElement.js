const ElementService = require("../../services/Element/updateElement");
const cloudinary = require("../../utils/cloudinary");

async function updateElement(req, res) {
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
    const Element = await ElementService.updateElement(
      ElementData,
      {
        ImageName: ElementData.ImageName,
        ImageLink: uploadedResponse?.secure_url,
      },
      req.params.id
    );
    res.status(201).json({ Element, message: "Element Modified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { updateElement };
