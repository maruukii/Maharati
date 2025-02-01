const userService=require("../../services/User/signup");
async function signup(req,res){
    try {
        const userData=req.body;
        const {savedUser,token}=await userService.signup(userData);
        res.status(201).json({user:savedUser,token:token,message:"User Created Successfully"})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}
async function activate(req,res){
    try {
        const {user,token}=req.body;
        const emailStatus=await userService.activate(user,token);
        res.status(201).json({emailStatus})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}
module.exports={signup,activate};