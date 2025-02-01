import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./Quiz.scss";
import { useParams, useLocation } from "react-router-dom";

const TestFinal = () => {
  const location = useLocation();
  const search = location.search;
  const { auth } = useAuth();
  const { id, _id } = useParams(); // Assuming this id is courseID.
  console.log(id);
  console.log(_id);
  const [quizzes, setQuizzes] = useState([
    {
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      score: "",
    },
  ]);

  const [formData, setFormData] = useState({});
  const [ID, setID] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formDat, setFormDat] = useState({});
  useEffect(() => {
    if (id) {
      const fetchCourseData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST}/courses/${id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          );
          if (search === "?false") {
            const respons = await axios.get(
              `${import.meta.env.VITE_HOST}/testfinals/${_id}`,
              {
                headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
                },
              }
            );

            setFormDat(respons.data);
            if (respons.data.Quizzs) {
              // Collect quizzes in an array
              const quizzesArray = respons.data.Quizzs.map((course) => {
                console.log(course);
                return {
                  text: course.question,
                  options: course.options,
                  correctAnswer: course.correctAnswer,
                  score: course.score,
                  _id: course._id, // Optional: include _id if needed later
                };
              });

              // Set quizzes only once
              setQuizzes(quizzesArray);
              if (quizzesArray.length > 0) {
                setID(_id); // Set the ID of the first quiz as an example
              }

              console.log("Quizzes set:", quizzesArray); // Log the quizzes array
            } else {
              console.warn(
                "Respons data is not defined or does not contain Quizzs"
              );
            }
          }
          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch course data:", error);
          setError("Failed to fetch course data");
        }
      };

      fetchCourseData();
    } else {
      console.error("ID is undefined or null");
    }
  }, [id,_id]);

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
      {
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        score: "",
      },
    ]);
  };

  const removeQuiz = (quizIndex) => {
    setQuizzes(quizzes.filter((_, i) => i !== quizIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalScore = quizzes.reduce(
      (sum, quiz) => sum + parseFloat(quiz.score || 0),
      0
    );

    if (totalScore >= 30) {
      alert("Total score cannot exceed 20. Please adjust the quiz scores.");
      return;
    }

    try {
      const payload = {
        courseID: id,
        courseName: formData.CourseName,
        Quizzs: quizzes.map((quiz) => ({
          question: quiz.text,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer,
          score: quiz.score,
        })),
      };
      console.log("Response:", payload);

      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/testfinals/new`,
        payload
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error creating quizzes:", error.response || error.message);
      if (error.response && error.response.data) {
        console.log("Backend error message:", error.response.data);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const totalScore = quizzes.reduce(
      (sum, quiz) => sum + parseFloat(quiz.score || 0),
      0
    );

    if (totalScore >= 30) {
      alert("Total score cannot exceed 20. Please adjust the quiz scores.");
      return;
    }

    try {
      const payload = {
        courseID: id,
        courseName: formData.CourseName,
        Quizzs: quizzes.map((quiz) => ({
          question: quiz.text,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer,
          score: quiz.score,
        })),
      };
      const response = await axios.put(
        `${import.meta.env.VITE_HOST}/testfinals/${ID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      console.log("Updated Quiz Response:", response.data);
    } catch (error) {
      console.error("Error updating quizzes:", error.response || error.message);
      if (error.response && error.response.data) {
        console.log("Backend error message:", error.response.data);
      }
    }
  };

  return (
    <div className="create-quiz">
      <div className="card-header">
        <h4 className="card-title">Create Quiz</h4>
      </div>
      <div className="m-5">
        <form onSubmit={search === "?true" ? handleSubmit : handleUpdate}>
          {quizzes.map((quiz, quizIndex) => (
            <div key={quizIndex} className="quiz-section">
              <h3 style={{ textDecoration: "underline", fontSize: "1.5rem" }}>
                Quiz {quizIndex + 1}
              </h3>
              <div>
                <input
                  type="text"
                  value={quiz.text || ""}
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
                    borderRadius: "100%",
                  }}
                  required
                />
              </div>

              <div>
                {quiz.options.map((option, optionIndex) =>
                  optionIndex % 2 === 0 ? (
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

                      {quiz.options[optionIndex + 1] !== undefined && (
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
                <label>Score:</label>
                <input
                  type="number"
                  value={quiz.score}
                  onChange={(e) => {
                    const newQuizzes = [...quizzes];
                    newQuizzes[quizIndex].score = e.target.value;
                    setQuizzes(newQuizzes);
                  }}
                  required
                />
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
          <button type="submit" className="submit-button">
            {search === "?true" ? "Create Quizzes" : "Update Quizzes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestFinal;
