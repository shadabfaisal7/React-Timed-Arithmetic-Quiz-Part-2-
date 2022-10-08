import React, { useState } from "react";
import "../styles/QuizGen.css";
import {
  evaluate,
  presenceValidator,
  randomNumGen,
  randomOperator,
} from "../shared/helper";

const QuizGeneration = ({ onQuizFormSubmit }) => {
  const def = [false, false, false, false];
  const [quizDetails, setQuizDetails] = useState({
    enteredMinLimit: "",
    enteredMaxLimit: "",
    enteredNoOfQuestions: "",
    enteredTimer: "",
  });
  const [controlCheckbox, setControlCheckbox] = useState(def);
  const [error, setError] = useState({});
  const [operationsArray, setOperationsArray] = useState([]);

  const generateQuestionnaire = () => {
    let questionnaire = [];
    for (let i = 0; i < quizDetails.enteredNoOfQuestions; i++) {
      const firstOperand = randomNumGen(
        quizDetails.enteredMinLimit,
        quizDetails.enteredMaxLimit
      );
      const secondOperand = randomNumGen(
        quizDetails.enteredMinLimit,
        quizDetails.enteredMaxLimit
      );
      const operator = randomOperator(operationsArray);

      questionnaire = [
        ...questionnaire,
        {
          question: { firstOperand, operator, secondOperand },
          correctAnswer: evaluate({ firstOperand, operator, secondOperand }),
        },
      ];
    }
    onQuizFormSubmit(
      questionnaire,
      quizDetails.enteredTimer,
      quizDetails.enteredMinLimit,
      quizDetails.enteredMaxLimit
    );
  };

  const updateDetailsHandler = (e) => {
    setQuizDetails({
      ...quizDetails,
      [e.target.name]: e.target.value,
    });
  };

  const checkboxHandler = (e, operation, checkboxArrIndex) => {
    e.target.checked
      ? setOperationsArray([...operationsArray, operation])
      : setOperationsArray(
          operationsArray.filter((item) => item !== operation)
        );
    setControlCheckbox((prev) => {
      prev[checkboxArrIndex] = !prev[checkboxArrIndex];
      return prev;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setError({});
    let err = {};
    if (!presenceValidator(quizDetails.enteredMinLimit)) {
      err = { ...err, MinLimit: `Min Limit can't be empty` };
    }
    if (!presenceValidator(quizDetails.enteredMaxLimit)) {
      err = { ...err, MaxLimit: `Max Limit can't be empty` };
    }
    if (!presenceValidator(quizDetails.enteredNoOfQuestions)) {
      err = { ...err, NoOfQuestions: `No Of Questions can't be empty` };
    }
    if (!presenceValidator(quizDetails.enteredTimer)) {
      err = { ...err, Timer: `Timer can't be empty` };
    }
    if (operationsArray.length === 0) {
      err = { ...err, Checkbox: `Pls tick atleast one checkbox` };
    }

    if (quizDetails.enteredMinLimit > quizDetails.enteredMaxLimit) {
      err = {
        ...err,
        MaxLimit: `Min limit should be equal or less than Max limit`,
      };
    }
    setError(err);

    if (Object.keys(err).length === 0) {
      generateQuestionnaire();

      setQuizDetails({
        ...quizDetails,
        enteredMinLimit: "",
        enteredMaxLimit: "",
        enteredNoOfQuestions: "",
        enteredTimer: "",
      });
      setOperationsArray([]);
      setControlCheckbox(def);
    }
  };

  return (
    <div>
      <h2>Quiz Generation</h2>
      <form onSubmit={submitHandler}>
        <label>Min limit</label>
        <input
          type="number"
          onChange={updateDetailsHandler}
          name="enteredMinLimit"
          value={quizDetails.enteredMinLimit}
        ></input>
        {error.MinLimit && <p className="text-danger">{error.MinLimit}</p>}
        <br />
        <label>Max limit</label>
        <input
          type="number"
          onChange={updateDetailsHandler}
          name="enteredMaxLimit"
          value={quizDetails.enteredMaxLimit}
        ></input>
        {error.MaxLimit && <p className="text-danger">{error.MaxLimit}</p>}
        <br />
        <label>No of Questions</label>
        <input
          type="number"
          onChange={updateDetailsHandler}
          name="enteredNoOfQuestions"
          value={quizDetails.enteredNoOfQuestions}
          min="0"
        ></input>
        {error.NoOfQuestions && (
          <p className="text-danger">{error.NoOfQuestions}</p>
        )}
        <br />
        <label>Timer</label>
        <input
          type="number"
          onChange={updateDetailsHandler}
          name="enteredTimer"
          value={quizDetails.enteredTimer}
          min="0"
        ></input>
        {error.Timer && <p className="text-danger">{error.Timer}</p>}
        <br />

        <p>Operations</p>
        <label htmlFor="+">+</label>
        <input
          id="+"
          type="checkbox"
          checked={controlCheckbox[0]}
          onChange={(e) => checkboxHandler(e, "+", 0)}
        ></input>
        <label htmlFor="-">-</label>
        <input
          id="-"
          type="checkbox"
          checked={controlCheckbox[1]}
          onChange={(e) => checkboxHandler(e, "-", 1)}
        ></input>
        <label htmlFor="/">/</label>
        <input
          id="/"
          type="checkbox"
          checked={controlCheckbox[2]}
          onChange={(e) => checkboxHandler(e, "/", 2)}
        ></input>
        <label htmlFor="*">*</label>
        <input
          id="*"
          type="checkbox"
          checked={controlCheckbox[3]}
          onChange={(e) => checkboxHandler(e, "*", 3)}
        ></input>
        {error.Checkbox && <p className="text-danger">{error.Checkbox}</p>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizGeneration;
