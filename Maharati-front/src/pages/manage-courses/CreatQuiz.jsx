// components/CreateQuiz.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Quiz.scss";
import { useParams } from "react-router-dom";

const CreateQuiz = () => {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Default 4 options
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [chapterId, setChapterId] = useState(""); // Select a chapter
  const [chapters, setChapters] = useState([]); // Available chapters
  const { id } = useParams();
  const [quizzes, setQuizzes] = useState([
    { text: "", options: ["", "", "", ""], correctAnswer: "", chapterId: "" },
  ]);

  useEffect(() => {
    // Fetch chapters for the selected course from the back-end
    axios
      .get(`${import.meta.env.VITE_HOST}/courses/${id}`)
      .then((response) => {
        console.log(response.data.Chapters);
        setChapters(response.data.Chapters);
      })
      .catch((error) => {
        console.error("Error fetching chapters", error);
      });
  }, [id]);

  const handleOptionChange = (quizIndex, optionIndex, value) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options[optionIndex] = value;
    setQuizzes(newQuizzes);
  };

  const addOption = (quizIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options.push("");
    setQuizzes(newQuizzes);
  };

  const removeOption = (quizIndex, optionIndex) => {
    const newQuizzes = [...quizzes];
    newQuizzes[quizIndex].options = newQuizzes[quizIndex].options.filter(
      (_, i) => i !== optionIndex
    );
    setQuizzes(newQuizzes);
  };
  const addQuiz = () => {
    setQuizzes([
      ...quizzes,
      { text: "", options: ["", "", "", ""], correctAnswer: "", chapterId: "" },
    ]);
  };

  const removeQuiz = (quizIndex) => {
    setQuizzes(quizzes.filter((_, i) => i !== quizIndex));
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Post each quiz individually
    Promise.all(
      quizzes.map((quiz) => {
        const quizData = {
          text: quiz.text,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer,
          chapterId: quiz.chapterId,
        };

        return axios.post(
          `${import.meta.env.VITE_HOST}/courses/${id}/chapters/${
            quiz.chapterId
          }/quiz`,
          quizData
        );
      })
    )
      .then(() => {
        alert("Quizzes created successfully!");
        // Reset form fields after successful creation
        setQuizzes([
          {
            text: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            chapterId: "",
          },
        ]);
      })
      .catch((error) => {
        console.error("Error creating quizzes", error);
        setError("Failed to create quizzes");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="create-quiz">
      <div className="card-header">
        <h4 className="card-title">Create Quiz</h4>
      </div>
      <div className="m-5">
        <form onSubmit={handleSubmit}>
          {quizzes.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz-section">
              <h3 style={{ textDecoration: "underline", fontSize: "1.5rem" }}>
                Quiz {quizIndex + 1}
              </h3>
              <div>
                <input
                  type="text"
                  value={quiz.text}
                  onChange={(e) => {
                    const newQuizzes = [...quizzes];
                    newQuizzes[quizIndex].text = e.target.value;
                    setQuizzes(newQuizzes);
                  }}
                  placeholder="Question Text"
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                    lineHeight: "1.5",
                    textAlign: "center",
                    backgroundColor: "none",
                    border: "none",
                    borderRadius:'100%'
                  }}
                  required
                />
              </div>

              <div>
                {quiz.options.map((option, optionIndex) =>
                  optionIndex % 2 === 0 ? ( // Check if the option index is even
                    <div key={optionIndex} className="option-container">
                      <div className="option">
                        <input
                          type="text"
                          value={quiz.options[optionIndex]}
                          onChange={(e) =>
                            handleOptionChange(
                              quizIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          className="option-item"
                          placeholder={`Option ${optionIndex + 1}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(quizIndex, optionIndex)}
                          className="icon-button remove-option"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            marginBottom: "0.7rem",
                          }}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>

                      {quiz.options[optionIndex + 1] !== undefined && ( // Check if next option exists
                        <div className="option">
                          <input
                            type="text"
                            value={quiz.options[optionIndex + 1]}
                            onChange={(e) =>
                              handleOptionChange(
                                quizIndex,
                                optionIndex + 1,
                                e.target.value
                              )
                            }
                            placeholder={`Option ${optionIndex + 2}`}
                            className="option-item"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeOption(quizIndex, optionIndex + 1)
                            }
                            className="icon-button remove-option"
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              marginBottom: "0.7rem",
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null
                )}

                <button
                  type="button"
                  onClick={() => addOption(quizIndex)}
                  className="icon-button add-option"
                  style={{ backgroundColor: "#42940cdd" }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add Option</span>
                </button>
              </div>

              <div>
                <label>Correct Answer:</label>
                <input
                  type="text"
                  value={quiz.correctAnswer}
                  onChange={(e) => {
                    const newQuizzes = [...quizzes];
                    newQuizzes[quizIndex].correctAnswer = e.target.value;
                    setQuizzes(newQuizzes);
                  }}
                  required
                />
              </div>

              <div>
                <label>Select Chapter:</label>
                <select
                  value={quiz.chapterId}
                  onChange={(e) => {
                    const newQuizzes = [...quizzes];
                    newQuizzes[quizIndex].chapterId = e.target.value;
                    setQuizzes(newQuizzes);
                  }}
                  required
                >
                  <option value="">Select a Module</option>
                  {chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.ChapterTitle}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => removeQuiz(quizIndex)}
                className="remove-quiz-button"
                style={{
                  backgroundColor: "#c80202dd",
                  color: "white",
                  border: "none",
                  padding: "0.5rem",
                  fontSize: "15px",
                  width: "50%",
                  float: "right",
                }}
              >
                Remove Quiz
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuiz}
            className="add-quiz-button"
            style={{
              backgroundColor: "#42940cdd",
              color: "white",
              border: "none",
              padding: "0.5rem",
              fontSize: "15px",
              width: "50%",
              marginTop: "-2.41rem",
            }}
          >
            Add Quiz
          </button>

          <button type="submit">Create Quizzes</button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
