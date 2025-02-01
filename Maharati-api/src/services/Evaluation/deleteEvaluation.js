const Evaluation = require("../../models/evaluation");
const Audit = require("../../models/audit");

async function deleteEvaluation(doneBy, evaluationID) {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(evaluationID);
    const log = new Audit({
      type: "Evaluation Deleted",
      doneBy: doneBy,
      On: evaluation,
    });
    await log.save();
    return evaluation;
  } catch (error) {
    console.error("Error Deleting Data:", error.message);
    throw new Error("Error Deleting Data");
  }
}
module.exports = { deleteEvaluation };
