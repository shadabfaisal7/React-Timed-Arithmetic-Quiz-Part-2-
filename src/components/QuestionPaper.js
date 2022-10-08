import React, { useState } from "react";
import Results from "./Results";
import MainQuiz from "./MainQuiz";
import { ENDMODE, STARTMODE } from "../shared/helper";

const QuestionPaper = ({ questions, timer, quizNo, MaxLimit, MinLimit }) => {
  const [mode, setMode] = useState(STARTMODE);
  const [responses, setResponses] = useState({
    correctResponse: {},
    wrongResponse: {},
  });

  const onQuizEnd = (value, correctHistoryList, wrongHistoryList) => {
    setMode(value);
    setResponses({
      correctHistoryList,
      wrongHistoryList,
    });
  };
  return (
    <div>
      {mode === STARTMODE && (
        <MainQuiz
          onQuizEnd={onQuizEnd}
          questions={questions}
          timer={timer}
          MaxLimit={MaxLimit}
          MinLimit={MinLimit}
          quizNo={quizNo}
        />
      )}
      {mode === ENDMODE && <Results responses={responses} />}
    </div>
  );
};

export default QuestionPaper;
