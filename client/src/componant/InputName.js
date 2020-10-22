import React from "react";

const InputName = ({ onChange, value }) => {
  return (
    <div className="input-name">
      <input type="text" onChange={onChange} value={value} autoFocus />
    </div>
  );
};

export default InputName;
