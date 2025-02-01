const Evaluation=require("../../models/evaluation")

async function fetchEvaluations(){
try {
    const evaluations = await Evaluation.find();
    return evaluations;
} catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data")    
}
}
async function fetchEvaluation(evaluationID){
    try {
        const evaluation = await Evaluation.findById(evaluationID);
        return evaluation;
    } catch (error) {
        console.error("Error Fetching Data:", error.message);
        throw new Error("Error Fetching Data")    
    }
    }
module.exports={fetchEvaluations,fetchEvaluation};