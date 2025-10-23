const ElementService = require("../../services/Element/deleteElement");
async function deleteElement(req, res) {
  try {
    const Element = await ElementService.deleteElement(req.params.id);
    res.status(200).json({ message: "Element Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteElement };
