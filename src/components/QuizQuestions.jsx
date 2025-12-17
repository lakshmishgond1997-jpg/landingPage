import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/ContextProvider';

const QUESTIONS = [
  {
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Text Machine Language',
      'Hyper Tool Markup Language',
      'None of the above',
    ],
    answer: 0,
  },
  {
    question: 'Which language is used for styling web pages?',
    options: ['HTML', 'JQuery', 'CSS', 'XML'],
    answer: 2,
  },
  {
    question: 'Which of the following is a JavaScript library?',
    options: ['React', 'Laravel', 'Django', 'Flask'],
    answer: 0,
  },
  {
    question: 'Which tag is used to define a hyperlink in HTML?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    answer: 1,
  },
  {
    question: 'Which company developed JavaScript?',
    options: ['Google', 'Microsoft', 'Netscape', 'Oracle'],
    answer: 2,
  },
];

function QuizQuestions({ uid }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [tryCount, setTryCount] = useState(1); // Track attempts

  const { uniqId, API_BASE_URL } = useAppContext();

  // Timer
  useEffect(() => {
    if (showResult) return;
    if (timeLeft === 0) handleNext();

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleNext = () => {
    const correctAnswer = QUESTIONS[currentIndex].answer;
    if (selectedOption === correctAnswer) setScore((prev) => prev + 1);

    setAnswers((prev) => [
      ...prev,
      {
        question: QUESTIONS[currentIndex].question,
        answer: QUESTIONS[currentIndex].options[selectedOption] ?? null,
      },
    ]);

    setSelectedOption(null);
    setTimeLeft(30);

    if (currentIndex + 1 < QUESTIONS.length)
      setCurrentIndex((prev) => prev + 1);
    else setShowResult(true);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
    setAnswers([]);
    setTryCount((prev) => prev + 1); // Increment try count on retry
  };

  // Send data to backend after quiz ends
  useEffect(() => {
    if (showResult && answers.length) {
      axios
        .post(
          `${API_BASE_URL}/webservice.php`,
          {
            savetype: 'savedata',
            uid: uniqId,
            score,
            qa: answers,
            tryCount, // send try count
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((res) => console.log('Saved:', res.data))
        .catch((err) => console.error('Error saving quiz:', err));
    }
  }, [showResult]);

  if (showResult) {
    return (
      <div className="quiz">
        <h2>Quiz Completed</h2>
        <p>Your Score</p>
        <div className="score">
          <strong>{score}</strong>
        </div>
        <button onClick={handleRetry} id="retry">
          Retry Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <div className="quiz">
      <h4>
        Question {currentIndex + 1} of {QUESTIONS.length}
      </h4>
      <p className="timer"> Time Left: {timeLeft}s</p>
      <h3>{currentQuestion.question}</h3>
      <ul className="options">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="option"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNext} disabled={selectedOption === null}>
        {currentIndex + 1 === QUESTIONS.length ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}

export default QuizQuestions;
