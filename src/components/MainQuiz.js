import React, { useState, useEffect, useCallback } from "react";
import { ENDMODE } from "../shared/helper";
import Time from "./Time";

const MainQuiz = ({
  onQuizEnd,
  questions,
  timer,
  quizNo,
  MinLimit,
  MaxLimit,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [seconds, setSeconds] = useState(timer);
  const [questionCount, setQuestionCount] = useState(1);
  const [usersWrongAnswerHistory, setUsersWrongAnswerHistory] = useState({});
  const [usersCorrectAnswerHistory, setUsersCorrectAnswerHistory] = useState(
    {}
  );

  const inputHandler = (e) => {
    setUserAnswer(e.target.value);
  };

  let displayQuestion;
  if (questionCount <= questions.length) {
    const { firstOperand, operator, secondOperand } =
      questions[questionCount - 1].question;
    displayQuestion = firstOperand + " " + operator + " " + secondOperand;
  }
  const solution =
    questionCount <= questions.length
      ? questions[questionCount - 1].correctAnswer
      : null;

  const nextQuestionHandler = useCallback(() => {
    setQuestionCount(questionCount + 1);

    const userAnswerEntry = {
      No: questionCount,
      Question: displayQuestion,
      Response: userAnswer ? userAnswer : "NA",
      Answer: solution,
    };

    if (solution === parseInt(userAnswer)) {
      setUsersCorrectAnswerHistory({
        ...usersCorrectAnswerHistory,
        [questionCount]: userAnswerEntry,
      });
    } else {
      setUsersWrongAnswerHistory({
        ...usersWrongAnswerHistory,
        [questionCount]: userAnswerEntry,
      });
    }
    setUserAnswer("");
  }, [
    displayQuestion,
    questionCount,
    solution,
    userAnswer,
    usersCorrectAnswerHistory,
    usersWrongAnswerHistory,
  ]);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        nextQuestionHandler();
        setSeconds(timer);
      }
    }, 1000);

    return () => clearTimeout(timerID);
  }, [seconds, nextQuestionHandler, timer]);

  useEffect(() => {
    if (questionCount > questions.length) {
      onQuizEnd(ENDMODE, usersCorrectAnswerHistory, usersWrongAnswerHistory);
    }
  }, [
    questionCount,
    usersCorrectAnswerHistory,
    usersWrongAnswerHistory,
    onQuizEnd,
    questions.length,
  ]);

  return (
    <div>
      <div>Quiz No {quizNo}</div> <br />
      <div>
        MinLimit - {MinLimit} MaxLimit - {MaxLimit}
      </div>
      <div>Question Count - {questions.length}</div>
      <Time timer={timer} timeLeft={seconds} />
      <div>Question No. - {questionCount}</div>
      <div>{displayQuestion}</div>
      <div>
        <input type="number" onChange={inputHandler} value={userAnswer} />
      </div>
      <div>
        <button onClick={nextQuestionHandler}>Next</button>
      </div>
      Score -- {Object.keys(usersCorrectAnswerHistory).length}
    </div>
  );
};

export default MainQuiz;
