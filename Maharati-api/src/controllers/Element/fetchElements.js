const ElementService = require("../../services/Element/fetchElements");

async function fetchElements(req, res) {
  try {
    const Elements = await ElementService.fetchElements();
    res.status(200).json(Elements);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Elements" });
  }
}

async function fetchElement(req, res) {
  try {
    const Element = await ElementService.fetchElement(req.params.id);
    if (!Element) {
      return res.status(404).json({ message: "Element not found" });
    }
    res.json(Element);
  } catch (error) {
    console.error("Error Fetching Element:", error.message);
    res.status(500).json({ message: "Error fetching Element" });
  }
}

module.exports = { fetchElements, fetchElement };
