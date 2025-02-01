const passwordService=require("../../services/Auth/forgotPassword");

async function forgotPassword(req,res){
    try {
        const {Email}=req.params;
        const generatedLink =await passwordService.forgotPassword(Email);
        res.status(201).json({message:"Password reset email sent successfully"})
    } catch (error) {
        res.status(401).json({message:"Wrong Email"})
    }
}
module.exports={forgotPassword}