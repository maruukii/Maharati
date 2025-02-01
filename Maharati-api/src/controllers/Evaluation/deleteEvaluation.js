const evaluationService = require("../../services/Evaluation/deleteEvaluation");
async function deleteEvaluation(req, res) {
  try {
    const evaluation = await evaluationService.deleteEvaluation(req.params.id);
    res.status(200).json({
      message: "Evaluation Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteEvaluation };
