const courseService = require("../../services/Course/addChapter");

const addChapterToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let chapterData = req.body;
    const files = req.files;

    // Initialize ChapterContent if it's undefined
    if (!chapterData.ChapterContent) {
      console.warn("ChapterContent is undefined.");
      chapterData.ChapterContent = [];
    }

    // Ensure ChapterContent is an array
    if (!Array.isArray(chapterData.ChapterContent)) {
      console.warn(
        "ChapterContent was not an array. Received:",
        chapterData.ChapterContent
      );
      chapterData.ChapterContent = [chapterData.ChapterContent]; // Wrap in array if necessary
    }

    // Parse and validate each content item
    chapterData.ChapterContent = chapterData.ChapterContent.map((content) => {
      console.log("Validating content:", content); // Log each content item

      // If content is a string, parse it
      if (typeof content === "string") {
        try {
          content = JSON.parse(content);
        } catch (error) {
          console.error("Failed to parse ChapterContent entry:", content);
          throw new Error("Invalid ChapterContent format");
        }
      }

      // Validate Quiz content
      if (content.type === "Quiz") {
        // Ensure value is an array of quiz objects
        if (!content.value || !Array.isArray(content.value) || content.value.length === 0) {
          throw new Error(`Invalid Quiz content: ${JSON.stringify(content)}`);
        }
      
        content.value.forEach((quizItem, index) => {
          console.log(`Validating quiz item ${index}:`, quizItem);
        
          const { question, options, correctAnswer } = quizItem;
        
          // Check if the question is a valid string
          if (typeof question !== "string" || question.trim() === "") {
            console.error(`Invalid question at index ${index}:`, question);
            throw new Error(`Quiz question must be a non-empty string. Received: ${question}`);
          }
        
          // Check if options is a valid array with at least 2 entries
          if (!Array.isArray(options) || options.length < 2) {
            console.error(`Invalid options at index ${index}:`, options);
            throw new Error(`Options must be an array with at least 2 options. Received: ${JSON.stringify(options)}`);
          }
        
          // Check if correctAnswer is a valid string
          if (typeof correctAnswer !== "string" || correctAnswer.trim() === "") {
            console.error(`Invalid correctAnswer at index ${index}:`, correctAnswer);
            throw new Error(`Correct answer must be a non-empty string. Received: ${correctAnswer}`);
          }
        });
        
      }
      
      // Validate Text content
      else if (content.type === "Text") {
        if (typeof content.value !== "string") {
          throw new Error("Text content must be a valid string.");
        }
      }

      return content; // Return the validated content
    });

    // Pass the validated chapter data to the service
    const updatedCourse = await courseService.addChapterToCourse(
      courseId,
      chapterData,
      files
    );

    res
      .status(200)
      .json({ message: "Chapter added successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error adding chapter:", error.message);
    res
      .status(500)
      .json({ message: "Error adding chapter", error: error.message });
  }
};

module.exports = addChapterToCourse;
