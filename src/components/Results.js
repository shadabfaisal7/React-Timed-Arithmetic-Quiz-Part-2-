import React from "react";
import "../styles/EndMenu.css";

const Results = ({ responses: { correctHistoryList, wrongHistoryList } }) => {
  const arrCorrectList = Object.keys(correctHistoryList).map(
    (item) => correctHistoryList[item]
  );
  const arrWrongList = Object.keys(wrongHistoryList).map(
    (item) => wrongHistoryList[item]
  );

  const renderTable = (listType) => {
    return (
      <table>
        <th>No</th>
        <th>Question</th>
        <th>Response</th>
        <th>Answer</th>
        {listType.map((item, index) => {
          const { No, Question, Response, Answer } = item;
          return (
            <tr key={No}>
              <td>{No}</td>
              <td>{Question}</td>
              <td>{Response}</td>
              <td>{Answer}</td>
            </tr>
          );
        })}
      </table>
    );
  };
  return (
    <>
      <h2>Score -- {arrCorrectList.length}</h2>
      <br />

      <h2>Correct Answers Are</h2>
      {renderTable(arrCorrectList)}
      <br />

      <h2>Wrong Answers Are</h2>
      {renderTable(arrWrongList)}
      <br />
    </>
  );
};

export default Results;
