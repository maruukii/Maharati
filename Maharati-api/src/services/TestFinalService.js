const TestModel = require("../models/TestFinal");

class TestFinalService {
  // Create a new test
  async createTest(testData) {
    try {
      const test = new TestModel(testData);
      return await test.save();
    } catch (err) {
      throw err;
    }
  }

  // Get all tests
  async getAllTests() {
    try {
      return await TestModel.find();
    } catch (err) {
      throw err;
    }
  }

  // Get a single test by ID
  async getTestById(id) {
    try {
      return await TestModel.findById(id);
    } catch (err) {
      throw err;
    }
  }

  // Update a test by ID
  async updateTest(id, updateData) {
    try {
      return await TestModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (err) {
      throw err;
    }
  }

  // Delete a test by ID
  async deleteTest(id) {
    try {
      return await TestModel.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new TestFinalService();
