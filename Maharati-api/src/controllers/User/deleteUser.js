const userService = require("../../services/User/deleteUser");
async function deleteUser(req, res) {
  try {
    const doneBy = req.query.doneBy;
    const user = await userService.deleteUser(doneBy, req.params.id);
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
module.exports = { deleteUser };
