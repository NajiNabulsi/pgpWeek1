import React from "react";
import "./inputName.css";
const InputAnswer = ({ onChange, value }) => {
  return (
    <div>
      <input type="text" onChange={onChange} value={value} autoFocus />
    </div>
  );
};

export default InputAnswer;
