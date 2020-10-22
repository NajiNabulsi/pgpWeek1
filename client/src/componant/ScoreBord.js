import React from "react";

const ScoreBord = ({ onclick, scor, correct, wrong }) => {
  return (
    <div className="Score_bord">
      <h1>
        correct : {correct} wrong : {wrong}
      </h1>
      <h1> {scor} </h1>
      <button onClick={onclick}>restart</button>
    </div>
  );
};

export default ScoreBord;
