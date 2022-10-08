import React from "react";

const Time = ({ timeLeft, timer }) => {
  return (
    <>
      <div>Timer - {timer}</div> <br />
      <div>Time Left - {timeLeft}</div>
    </>
  );
};

export default Time;
