import React, { useContext, useEffect, useState } from "react";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { UserContext } from "../../../contexts/UserContextProvider";

const SearchBar = ({ query, filterFunc, clearFilter }) => {
  const [filter, changeFilter] = useState("");

  const { darkMode } = useContext(UserContext);

  const typing = (event) => {
    changeFilter(event.target.value);
  };

  useEffect(() => {
    console.log(filter);
    filterFunc(filter);
  }, [filter]);

  return (
    <div className={`flex gap-2 p-4`}>
      <form
        className={`flex gap-2`}
        onSubmit={(e) => {
          e.preventDefault();
          filterFunc(filter);
        }}
      >
        <button type="submit">
          <SearchIcon />
        </button>
        <TextField
          placeholder={`search ${query}`}
          onChange={typing}
          value={filter}
          className={`${darkMode ? "bg-[#a6bbc8]" : "bg-white"} rounded-lg`}
        />
      </form>
      <button
        onClick={() => {
          changeFilter("");
          clearFilter();
        }}
      >
        <ClearIcon />
      </button>
    </div>
  );
};

export default SearchBar;
