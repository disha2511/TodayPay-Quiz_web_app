import { useState } from "react";
import allQuestions from "./data/questions.json"; // adjust if it's .js

export default function App() {
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = difficulty ? allQuestions[difficulty] : [];

  const handleAnswer = (option) => {
    if (option === questions[current].correct) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-lg text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            🚀 Welcome to the Quiz App
          </h1>
          <p className="text-gray-600 mb-8">
            Choose your difficulty and test your knowledge!
          </p>
          <div className="flex flex-col gap-4">
            {["easy", "medium", "hard"].map((level) => (
              <button
                key={level}
                onClick={() => {
                  setDifficulty(level);
                  setStarted(true);
                }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                {level.charAt(0).toUpperCase() + level.slice(1)} Mode
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Quiz Completed!</h2>
          <p className="text-gray-700 mb-6">
            Your Score: {score} / {questions.length}
          </p>
          <button
            onClick={() => {
              setStarted(false);
              setDifficulty(null);
              setCurrent(0);
              setScore(0);
              setFinished(false);
            }}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {questions[current].question}
        </h2>
        <div className="grid gap-4">
          {questions[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-md transition transform hover:scale-105"
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-6 text-gray-500 text-sm">
          Question {current + 1} of {questions.length} ({difficulty} mode)
        </p>
      </div>
    </div>
  );
}
