const userService = require("../../services/User/fetchUsers");

async function fetchUsers(req, res) {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Users" });
  }
}
async function fetchUser(req, res) {
  try {
    const user = await userService.fetchUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Error fetching User" });
  }
}
async function fetchUserByEmail(req, res) {
  try {
    const user = await userService.fetchUserByEmail(req.params.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Error fetching User" });
  }
}

async function fetchUserByPhone(req, res) {
  try {
    const user = await userService.fetchUserByPhone(req.params.phone);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Error fetching User" });
  }
}
module.exports = { fetchUsers, fetchUser, fetchUserByEmail, fetchUserByPhone };
