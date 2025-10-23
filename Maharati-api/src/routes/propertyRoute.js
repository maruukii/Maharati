const router = require("express").Router();

const { createProperty } = require("../controllers/Property/createProperty");
const { updateProperty } = require("../controllers/Property/updateProperty");
const { deleteProperty } = require("../controllers/Property/deleteProperty");
const {
  fetchProperties,
  fetchProperty,
} = require("../controllers/Property/fetchProperties");

router.post("/new", createProperty);
router.put("/update/:id", updateProperty);
router.delete("/delete/:id", deleteProperty);

router.get("/", fetchProperties);
router.get("/:id", fetchProperty);

module.exports = router;
