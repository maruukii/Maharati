const auditService = require("../../services/Audit/deleteAudit");
async function deleteAudit(req, res) {
  try {
    const audit = await auditService.deleteAudit(req.params.id);
    res.status(200).json({ message: "Audit Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteAudit };
