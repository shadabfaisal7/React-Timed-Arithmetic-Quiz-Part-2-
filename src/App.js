import React, { useState } from "react";
import QuizGeneration from "./components/QuizGeneration";
import "./styles/App.css";
import QuestionPaper from "./components/QuestionPaper";

const App = () => {
  const [quizInputs, setQuizInputs] = useState([]);

  const onQuizFormSubmit = (
    questionnaire,
    enteredTimer,
    enteredMinLimit,
    enteredMaxLimit
  ) => {
    setQuizInputs((prevQuizInputs) => {
      return [
        ...prevQuizInputs,
        {
          questionnaire: questionnaire,
          Timer: enteredTimer,
          MaxLimit: enteredMaxLimit,
          MinLimit: enteredMinLimit,
        },
      ];
    });
  };

  return (
    <>
      <div>
        <QuizGeneration onQuizFormSubmit={onQuizFormSubmit} />
      </div>
      <div className="quiz">
        {quizInputs.map((item, idx) => {
          const { questionnaire, Timer, MaxLimit, MinLimit } = item;
          return (
            <div key={idx + item} className="childquiz">
              <QuestionPaper
                questions={questionnaire}
                timer={Timer}
                MaxLimit={MaxLimit}
                MinLimit={MinLimit}
                quizNo={idx + 1}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
