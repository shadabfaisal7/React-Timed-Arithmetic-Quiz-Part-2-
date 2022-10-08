export const presenceValidator = (input) => {
  return input.trim().length !== 0;
};

export const evaluate = ({ firstOperand, operator, secondOperand }) => {
  const n1 = Number(firstOperand);
  const opr = operator;
  const n2 = Number(secondOperand);

  switch (opr) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "*":
      return n1 * n2;
    case "/":
      return n1 / n2;
    default:
      return "Not valid";
  }
};

export const randomNumGen = (min, max) => {
  min = Number(min);
  max = Number(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomOperator = (operationsArray) => {
  const randomOperatorIndex = Math.floor(
    Math.random() * operationsArray.length
  );
  return operationsArray[randomOperatorIndex];
};

export const ENDMODE = "END";
export const STARTMODE = "START";

export const displayQuestion = ({firstOperand, operator, secondOperand}) => {
  return `${firstOperand} ${operator} ${secondOperand}`;
};
