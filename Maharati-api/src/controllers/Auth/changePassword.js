const passwordService=require("../../services/Auth/changePassword");

async function changePassword(req,res){
    try {
        const {Password,id}=req.body;
        const saving =await passwordService.changePassword(Password,id);
        res.json(saving)
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}
module.exports={changePassword}