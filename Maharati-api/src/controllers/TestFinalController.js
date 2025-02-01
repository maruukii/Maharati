const TestService = require("../services/TestFinalService");

class TestController {
  // Create a new test
  async createTest(req, res) {
    try {
      const test = await TestService.createTest(req.body);
      res.status(201).json(test);
    } catch (err) {
      res.status(500).json({ message: "Error creating test", error: err });
    }
  }

  // Get all tests
  async getAllTests(req, res) {
    try {
      const tests = await TestService.getAllTests();
      res.status(200).json(tests);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving tests", error: err });
    }
  }

  // Get a test by ID
  async getTestById(req, res) {
    try {
      const test = await TestService.getTestById(req.params.id);
      if (test) {
        res.status(200).json(test);
      } else {
        res.status(404).json({ message: "Test not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error retrieving test", error: err });
    }
  }

  // Update a test
  async updateTest(req, res) {
    try {
      const test = await TestService.updateTest(req.params.id, req.body);
      if (test) {
        res.status(200).json(test);
      } else {
        res.status(404).json({ message: "Test not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error updating test", error: err });
    }
  }

  // Delete a test
  async deleteTest(req, res) {
    try {
      const test = await TestService.deleteTest(req.params.id);
      if (test) {
        res.status(200).json({ message: "Test deleted" });
      } else {
        res.status(404).json({ message: "Test not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting test", error: err });
    }
  }
}

module.exports = new TestController();
