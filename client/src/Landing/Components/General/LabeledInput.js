import React from "react";

const LabeledInput = ({ labelText, type, handleChange, state, name }) => {
  return (
    <div className="flex gap-2 justify-between">
      <label htmlFor={`input-${type}`}>{labelText}</label>
      <input
        className="border-2 border-solid border-black"
        type={type}
        id={`input-${type}`}
        onChange={(e) => handleChange(e)}
        value={state}
        name={name}
      />
    </div>
  );
};

export default LabeledInput;
