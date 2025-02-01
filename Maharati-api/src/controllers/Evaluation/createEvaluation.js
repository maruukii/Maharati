const evaluationService = require("../../services/Evaluation/createEvaluation");
async function createEvaluation(req, res) {
  try {
    const evaluationData = req.body;
    const evaluation = await evaluationService.createEvaluation(evaluationData);
    res.status(200).json({ message: "Evaluation Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { createEvaluation };
