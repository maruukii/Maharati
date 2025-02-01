const User = require("../../models/user");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

async function editProfile(userData) {
  try {
    const user = await User.findById(userData._id);
    if (user) {
      if (userData.Email) {
        user.Email = userData.Email;
      }
      if (userData.FirstName) {
        user.FirstName = userData.FirstName;
      }
      if (userData.LastName) {
        user.LastName = userData.LastName;
      }
      if (userData.Password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.Password, salt);
        user.Password = hashedPassword;
      }
      if (userData.PhoneNumber) {
        user.PhoneNumber = userData.PhoneNumber;
      }

      if (userData.LearningLanguage) {
        user.LearningLanguage = userData.LearningLanguage;
      }
      if (userData.Gender) {
        user.Gender = userData.Gender;
      }
      if (userData.Address) {
        user.Address = userData.Address;
      }
      if (userData.DateofBirth) {
        user.DateofBirth = userData.DateofBirth;
      }
      user.save();
    }
  } catch (error) {
    console.error("Error Updating Data:", error.message);
    throw new Error("Error Updating Data");
  }
}
module.exports = { editProfile };
