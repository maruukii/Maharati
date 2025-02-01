import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import "./Quiz.scss";

class Quiz extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Quiz</title>
        </Helmet>
        <div className="questions">
          <div className="lifeline-container">
            <p>
              <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
              2
            </p>
            <p>
              <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
              5
            </p>
          </div>
          <div className="timer-container">
            <p>
              <span className="left" style={{ float: "left" }}>
                1 of 15
              </span>
              <span className="right" style={{ float: "right" }}>
                2:15
              </span>
              <span
                className="mdi mdi-clock-outline "
                style={{ float: "right" }}
              ></span>
            </p>
          </div>
          <h5>Question Text</h5>
          <div className="option-container">
            <p className="option">Option 1</p>
            <p className="option">Option 2</p>
          </div>
          <div className="option-container">
            <p className="option">Option 3</p>
            <p className="option">Option 4</p>
          </div>
          <div className="button-container">
            <button>Previous</button>
            <button>Next</button>
            <button>Quit</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Quiz;
