const Evaluation = require("../../models/evaluation");
const Audit = require("../../models/audit");

async function updateEvaluation(evaluationData, evaluationID) {
  try {
    const evaluation = await Evaluation.findById(evaluationID);

    if (evaluationData.EvaluationDescription) {
      evaluation.EvaluationDescription = evaluationData.EvaluationDescription;
    }
    if (evaluationData.EvaluationName) {
      evaluation.EvaluationName = evaluationData.EvaluationName;
    }
    if (evaluationData.Content) {
      evaluation.Content = evaluationData.Content;
    }
    if (evaluationData.EvaluationType) {
      evaluation.EvaluationType = evaluationData.EvaluationType;
    }

    evaluation.save();
    const log = new Audit({
      type: "Evaluation Updated",
      doneBy: doneBy,
      On: evaluation,
    });
    await log.save();
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { updateEvaluation };
