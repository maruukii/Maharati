const userService = require("../../services/User/editProfile");
async function editProfile(req, res) {
  try {
    const userData = req.body;
    const user = await userService.editProfile(userData);
    res.status(200).json({ message: "Profile Modified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { editProfile };
