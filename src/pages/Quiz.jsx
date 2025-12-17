import React from 'react';
import { useState } from 'react';

import QuizStart from '../components/QuizStart.jsx';
import QuizQuestions from '../components/QuizQuestions.jsx';

function Quiz() {
  const [quizBool, setQuizBool] = useState(true);
  return (
    <>
      {quizBool ? (
        <QuizStart setQuizBool={setQuizBool} />
      ) : (
        <QuizQuestions setQuizBool={setQuizBool} />
      )}
    </>
  );
}

export default Quiz;
