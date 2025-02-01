const Audit = require("../../models/audit");

async function deleteAudit(auditID) {
  try {
    const audit = await Audit.findByIdAndDelete(auditID);
    return audit;
  } catch (error) {
    console.error("Error Deleting Data:", error.message);
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteAudit };
