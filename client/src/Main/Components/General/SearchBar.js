import React, { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ query, filterFunc, clearFilter }) => {
  const [filter, changeFilter] = useState("");

  const typing = (event) => {
    changeFilter(event.target.value);
  };

  useEffect(() => {
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
