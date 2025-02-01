const User=require("../../models/user.js")
const jwt=require("jsonwebtoken")
require('dotenv').config();
const secretKey = process.env.JWT_ACCESS_SECRET_KEY;

async function activateAccount(id,token){
    try {
        var found=await User.findById(id);
        if(!found){throw new Error("User not Found");}
        const verify=jwt.verify(token,secretKey)
        if(verify){
            found.Status=true;
            await found.save();
            console.log("Account Activated")
        }
        return verify;
    }
catch (error) {
        await User.findByIdAndDelete(id);
        console.error('Error:', error.message);
        throw new Error("Internal Server Error, User deleted " ); 
    }
}
module.exports={activateAccount};