const evaluationService = require("../../services/Evaluation/fetchEvaluations");

async function fetchEvaluations(req, res) {
  try {
    const evaluations = await evaluationService.fetchEvaluations();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Evaluations" });
  }
}
async function fetchEvaluation(req, res) {
  try {
    const evaluation = await evaluationService.fetchEvaluation(req.params.id);
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Evaluation" });
  }
}
module.exports = { fetchEvaluations, fetchEvaluation };
