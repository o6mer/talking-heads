import React from "react";
import { BsFilter } from "react-icons/bs";

import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ query }) => {
  return (
    <div className={`flex gap-2 p-4`}>
      <button>
        <SearchIcon />
      </button>
      <TextField placeholder={`search ${query}`} />
    </div>
  );
};

export default SearchBar;
