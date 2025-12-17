import React from 'react';
import { useState } from 'react';
function QuizStart({ setQuizBool }) {
  const [startBool, setStartBool] = useState(true);

  return (
    <>
      <div className="quizStart">
        <div className="quizStartContainer">
          {' '}
          {startBool ? (
            <>
              <div className="logo">
                <img src="/Logo_color2.webp" alt="Logo" className="logo" />
              </div>
              <h3>Welcome to the Quiz Page</h3>
              <button id="start" onClick={() => setStartBool(false)}>
                START
              </button>
            </>
          ) : (
            <>
              <h3>Quiz Instructions</h3>
              <ul className="instructions">
                <li>This quiz contains multiple-choice questions.</li>
                <li>You must select one correct answer for each question.</li>
                <li>Each question must be answered within the given time.</li>
                <li>
                  Your final score will be displayed at the end of the quiz.
                </li>
              </ul>
              <button id="next" onClick={() => setQuizBool(false)}>
                NEXT
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizStart;
