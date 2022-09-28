import React, { useState } from "react";
import { BsFilter } from "react-icons/bs";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ query, filterRooms, clearFilter }) => {
  const [filter, changeFilter] = useState("");

  const typing = (event) => {
    changeFilter(event.target.value);
  };

  return (
    <div className={`flex gap-2 p-4`}>
      <button
        onClick={() => {
          filterRooms(filter);
        }}
      >
        <SearchIcon />
      </button>
      <TextField placeholder={`search ${query}`} onChange={typing} />
      <button
        onClick={() => {
          clearFilter();
        }}
      >
        <ClearIcon />
      </button>
    </div>
  );
};

export default SearchBar;
