const User=require("../../models/user.js")
const jwt=require("jsonwebtoken")
require('dotenv').config();
const secretKey = process.env.JWT_ACCESS_SECRET_KEY;

async function resetPassword(id,token){
    try {
        var found=await User.findById(id);
        if(!found){throw new Error("User not Found");}
        const verify=jwt.verify(token,secretKey)
        return verify;
    }
catch (error) {
        console.error('Error:', error.message);
        throw new Error("Internal Server Error"); 
    }
}
module.exports={resetPassword};