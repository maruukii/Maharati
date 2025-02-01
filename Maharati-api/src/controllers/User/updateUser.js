const userService = require("../../services/User/updateUser");
async function updateUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.updateUser(userData, req.params.id);
    res.status(201).json({ message: "User Modified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { updateUser };
