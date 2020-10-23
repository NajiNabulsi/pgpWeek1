import React from "react";
import "./ScoerTable.css";

const ScoerTable = ({ names, scoer, win }) => {
  //   if (!scoer) {
  //     scoer = "no scoer fond";
  //   }
  return (
    <div className="scoerTable">
      <div className={`scoerTable_div ${win}`}>{names}</div>
      <div className={`scoerTable_div ${win}`}>{scoer}</div>
    </div>
  );
};

export default ScoerTable;
