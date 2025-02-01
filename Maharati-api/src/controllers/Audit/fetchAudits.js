const auditService = require("../../services/Audit/fetchAudits");

async function fetchAudits(req, res) {
  try {
    const audits = await auditService.fetchAudits();
    res.status(200).json(audits);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Audits" });
  }
}
async function fetchAudit(req, res) {
  try {
    const audit = await auditService.fetchAudit(req.params.id);
    res.status(200).json(audit);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Audit" });
  }
}

module.exports = { fetchAudits, fetchAudit };
