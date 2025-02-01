const evaluationService = require("../../services/Evaluation/updateEvaluation");

async function updateEvaluation(req, res) {
  try {
    const evaluationData = req.body;
    const evaluation = await evaluationService.updateEvaluation(
      evaluationData,
      req.params.id
    );
    res.status(200).json({
      message: "Evaluation Modified Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { updateEvaluation };
