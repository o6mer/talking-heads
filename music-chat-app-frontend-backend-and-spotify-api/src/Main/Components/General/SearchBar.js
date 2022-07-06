import React from "react";
import { BsFilter } from "react-icons/bs";

const SearchBar = () => {
  const borderStyle = "border-black border-solid border-2";

  return (
    <div className={`flex gap-2 p-4 text-xl ${borderStyle}`}>
      <button className="text-2xl">
        <BsFilter />
      </button>
      <input type={`text`} className={`${borderStyle} w-full `} />
    </div>
  );
};

export default SearchBar;
