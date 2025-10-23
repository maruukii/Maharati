const router = require("express").Router();

const { createElement } = require("../controllers/Element/createElement");
const { updateElement } = require("../controllers/Element/updateElement");
const { deleteElement } = require("../controllers/Element/deleteElement");
const {
  fetchElements,
  fetchElement,
} = require("../controllers/Element/fetchElements");

router.post("/new", createElement);
router.put("/update/:id", updateElement);
router.delete("/delete/:id", deleteElement);

router.get("/", fetchElements);
router.get("/:id", fetchElement);

module.exports = router;
