import React, { useState, useEffect } from "react";
import textIcon from "../../assets/images/contentTypes/textIcon.png";
import Heading1 from "../../assets/images/contentTypes/Heading1.png";
import Heading2 from "../../assets/images/contentTypes/Heading2.png";
import Heading3 from "../../assets/images/contentTypes/Heading3.png";
import todoList from "../../assets/images/contentTypes/todoList.png";
import photo from "../../assets/images/contentTypes/photo.png";
import video from "../../assets/images/contentTypes/video.png";
import Quiz from "../../assets/images/contentTypes/Quiz.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./CoursesDash.scss";
import axios from "axios";
import useAuth from "../../hooks/useAuth.js";
import { useParams } from "react-router-dom";

const contentTypes = [
  { id: 1, label: "Text", image: textIcon, description: "Write text content." },

  {
    id: 3,
    label: "To-do List",
    image: todoList,
    description: "Create a to-do list.",
  },
  {
    id: 4,
    label: "Heading1",
    image: Heading1,
    description: "Add a main heading.",
  },
  {
    id: 5,
    label: "Heading2",
    image: Heading2,
    description: "Add a sub-heading.",
  },
  {
    id: 6,
    label: "Heading3",
    image: Heading3,
    description: "Add a minor heading.",
  },
  { id: 7, label: "Photo", image: photo, description: "Add a photo." },
  { id: 8, label: "Video", image: video, description: "Add a video." },
  { id: 9, label: "Quiz", image: Quiz, description: "Add a Quiz." },
];

function Contenu({ id, onContentChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const [toggleMenuId, setToggleMenuId] = useState(null);
  const [quizzes, setQuizzes] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/") {
        setShowMenu((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFileChange = (e, id) => {
    const file = e.target.files[0]; // Get the selected file

    const reader = new FileReader();

    reader.onloadend = () => {
      // Update the input state with the new file data
      setInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id ? { ...input, value: reader.result } : input
        )
      );
      onContentChange((prevContent) =>
        prevContent.map((input) =>
          input.id === id ? { ...input, value: reader.result } : input
        )
      );
      // Update the chapter content when the file is loaded
      // Ensures ChapterContent is an array
    };

    reader.readAsDataURL(file);
  };
  const handleFileChangeA = (e, id) => {
    const file = e.target.files[0]; // Get the selected file

    const reader = new FileReader();

    reader.onloadend = () => {
      // Update the input state with the new file data
      setInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.id === id ? { ...input, value: reader.result } : input
        )
      );
      onContentChange([{ id, type: "Video", value: reader.result }]);
      // Update the chapter content when the file is loaded
      // Ensures ChapterContent is an array
    };

    reader.readAsDataURL(file);
  };
  const handleSelectContent = (content) => {
    const newInput = {
      id: Date.now(),
      type: content.label,
      value: content.label === "Quiz" ? quizzes : "",
    };

    setInputs((prevInputs) => [...prevInputs, newInput]);
    onContentChange([...inputs, newInput]);
    setShowMenu(false);
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
    onContentChange(inputs);
    console.log(quizzes);
    console.log(inputs);
  };
  const addInputBelow = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

    const index = inputs.findIndex((input) => input.id === id);
    if (index !== -1) {
      const newInput = {
        id: Date.now(),
        type: selectedContent.label,
        value: "",
      };
      setInputs((prevInputs) => [
        ...prevInputs.slice(0, index + 1),
        newInput,
        ...prevInputs.slice(index + 1),
      ]);
      onContentChange([...quizzes, newInput]);
    }
  };

  const toggleMenu = (id) => {
    setToggleMenuId((prev) => (prev === id ? null : id));
  };

  const handleContentTypeSelection = (content) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === toggleMenuId ? { ...input, type: content.label } : input
      )
    );
    setToggleMenuId(null);
  };
  const handleOptionChange = (quizIndex, optionIndex, value) => {
    setQuizzes((prevQuizzes) => {
      const newQuizzes = [...prevQuizzes];
      newQuizzes[quizIndex].options[optionIndex] = value;

      // Also update the corresponding quiz in the inputs state
      setInputs((prevInputs) =>
        prevInputs.map((input) =>
          input.type === "Quiz" && input.value === newQuizzes[quizIndex]
            ? { ...input, value: newQuizzes[quizIndex] }
            : input
        )
      );
      return newQuizzes;
    });
  };
  const handleCorrectAnswerChange = (quizIndex, value) => {
    setQuizzes((prevQuizzes) => {
      const newQuizzes = [...prevQuizzes];
      newQuizzes[quizIndex].correctAnswer = value;
      return newQuizzes;
    });
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
    const newQuiz = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    };
    setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);

    // Update inputs to include the new quiz
    const quizInput = {
      id: Date.now(),
      type: "Quiz",
      value: newQuiz,
    };
    setInputs((prevInputs) => [...prevInputs, quizInput]);
    onContentChange([...quizzes, quizInput]);
  };

  const removeQuiz = (quizIndex) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((_, i) => i !== quizIndex));
    setInputs((prevInputs) =>
      prevInputs.filter(
        (input) => !(input.type === "Quiz" && input.value.id === quizIndex)
      )
    );
    onContentChange(quizzes);
  };
  const handleQuizTextChange = (quizIndex, value) => {
    setQuizzes((prevQuizzes) => {
      const newQuizzes = [...prevQuizzes];
      newQuizzes[quizIndex].question = value;
      return newQuizzes;
    });
  };

  const renderInputField = (input) => {
    switch (input.type) {
      case "Quiz":
        return (
          <div className="create-quiz">
            <div className="card-header">
              <h4 className="card-title">Create Quiz</h4>
            </div>
            <div className="m-5">
              {quizzes.map((quiz, quizIndex) => (
                <div key={quizIndex} className="quiz-section">
                  <h3
                    style={{
                      textDecoration: "underline",
                      fontSize: "1.5rem",
                    }}
                  >
                    Quiz {quizIndex + 1}
                  </h3>
                  <div>
                    <input
                      type="text"
                      value={quiz.question}
                      onChange={(e) => {
                        handleQuizTextChange(quizIndex, e.target.value);
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
                              onClick={() =>
                                removeOption(quizIndex, optionIndex)
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
                        handleCorrectAnswerChange(quizIndex, e.target.value);
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
            </div>
          </div>
        );
      case "Text":
        return (
          <textarea
            placeholder="Enter text here..."
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        );
      case "To-do List":
        return (
          <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Completed
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Item
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {(input.value || []).map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) =>
                          handleToDoItemChange(input.id, item.id, {
                            ...item,
                            completed: e.target.checked,
                          })
                        }
                      />
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          handleToDoItemChange(input.id, item.id, {
                            ...item,
                            value: e.target.value,
                          })
                        }
                        style={{ width: "100%", padding: "8px" }}
                      />
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <button
                        onClick={() => removeToDoItem(input.id, item.id)}
                        style={{
                          cursor: "pointer",
                          padding: "6px 12px",
                          border: "1px solid #dc3545",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          borderRadius: "4px",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => addToDoItem(input.id)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                border: "1px solid #007bff",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              Add Item
            </button>
          </div>
        );
      case "Heading1":
      case "Heading2":
      case "Heading3":
        return (
          <input
            type="text"
            placeholder={`Enter ${input.type}...`}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize:
                input.type === "Heading 1"
                  ? "1.5rem"
                  : input.type === "Heading 2"
                  ? "1.2rem"
                  : "1rem",
              fontWeight:
                input.type === "Heading 1"
                  ? "bold"
                  : input.type === "Heading 2"
                  ? "bold"
                  : "normal",
            }}
          />
        );
      case "Photo":
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, input.id)}
              style={{ width: "100%", padding: "8px" }}
            />
            {input.value && (
              <img
                src={input.value}
                alt="Uploaded"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
          </div>
        );
      case "Video":
        return (
          <div>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChangeA(e, input.id)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        );
      default:
        return (
          <input
            type="text"
            placeholder={`Input for ${input.type}`}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        );
    }
  };

  return (
    <div>
      <div className="card-header-contenu">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="content-buttons">
            {contentTypes.map((content) => (
              <button
                key={content.id}
                onClick={() => handleSelectContent(content)}
                className="card-title-contenu"
              >
                + {content.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
        {inputs.map((input) => (
          <div key={input.id} style={{ marginBottom: "15px" }}>
            {renderInputField(input)}
            <div style={{ marginTop: "10px" }}>
              {/* <button
                type="button"
                onClick={() => addInputBelow(input.id)}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  border: "1px solid #007bff",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                Add Below
              </button> */}
              <button
                onClick={() => toggleMenu(input.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                Change Type
              </button>
              {toggleMenuId === input.id && (
                <div
                  className={`popup-menu ${
                    toggleMenuId === input.id ? "show" : ""
                  }`}
                >
                  <div className="popup-menu-content">
                    {contentTypes.map((content) => (
                      <div
                        key={content.id}
                        onClick={() => handleContentTypeSelection(content)}
                        className="popup-menu-item"
                      >
                        <img
                          src={content.image}
                          alt={content.label}
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {toggleMenuId === input.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    marginTop: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                >
                  {contentTypes.map((content) => (
                    <div
                      key={content.id}
                      onClick={() => handleContentTypeSelection(content)}
                      style={{
                        cursor: "pointer",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #ddd",
                        padding: "5px 0",
                      }}
                    >
                      <img
                        src={content.image}
                        alt={content.label}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <span>{content.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contenu;
