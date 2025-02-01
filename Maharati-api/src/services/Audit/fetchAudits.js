const Audit = require("../../models/audit");

async function fetchAudits() {
  try {
    const audits = await Audit.find().populate("doneBy");
    return audits;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchAudit(auditID) {
  try {
    const audit = await Audit.findById(auditID);
    return audit;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}

module.exports = { fetchAudits, fetchAudit };
