const userService = require("../../services/User/createUser");
async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(200).json({ message: "user Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { createUser };
