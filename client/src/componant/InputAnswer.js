import React, { useRef } from "react";

const InputAnswer = ({ onChange, value, ref }) => {
  // const ref = useRef();
  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        value={value}
        autoFocus
        ref={ref}
      />
    </div>
  );
};

export default InputAnswer;
