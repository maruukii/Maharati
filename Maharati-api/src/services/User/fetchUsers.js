const User = require("../../models/user");

async function fetchUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchUser(userID) {
  try {
    const user = await User.findById(userID);
    return user;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchUserByEmail(email) {
  try {
    var user = await User.findOne({ Email: email });
    return user;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}

async function fetchUserByPhone(phone) {
  try {
    var user = await User.findOne({ PhoneNumber: phone });
    return user;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
async function fetchUserByRole(Role) {
  try {
    var user = await User.find({ Role: Role });
    return user;
  } catch (error) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
}
module.exports = {
  fetchUsers,
  fetchUser,
  fetchUserByEmail,
  fetchUserByPhone,
  fetchUserByRole,
};
