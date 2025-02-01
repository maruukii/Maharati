const User = require('../../models/user');

async function Logout(cookies) {
    if (!cookies?.jwt) throw new Error("No refresh token provided");
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken });
    
    if (!foundUser) {
        throw new Error("User not found");}
    // Verify JWT
    foundUser.refreshToken='';
    foundUser.save()
    return "token cleared"
}

module.exports = { Logout };
