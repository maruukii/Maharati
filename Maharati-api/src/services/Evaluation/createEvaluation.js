const Evaluation = require("../../models/evaluation");
const Audit = require("../../models/audit");

async function createEvaluation(evaluationData) {
  try {
    const {
      EvaluationName,
      EvaluationDescription,
      createdBy,
      Content,
      EvaluationType,
    } = evaluationData;

    const CreatedEvaluation = new Evaluation({
      EvaluationName,
      EvaluationDescription,
      createdBy,
      Content,
      EvaluationType,
    });
    const savedEvaluation = await CreatedEvaluation.save();
    const log = new Audit({
      type: "Evaluation Added",
      doneBy: createdBy,
      On: savedEvaluation,
    });
    await log.save();
    return savedEvaluation;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = { createEvaluation };
