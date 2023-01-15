import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { UserContext } from "../../../contexts/UserContextProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SearchBar = ({ query, filterFunc, clearFilter, setOpen, isShown }) => {
  const [filter, changeFilter] = useState("");

  const { darkMode } = useContext(UserContext);

  const typing = (event) => {
    changeFilter(event.target.value);
  };

  useEffect(() => {
    filterFunc(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className={`flex gap-2 p-4 justify-center items-center`}>
      <form
        className={`flex gap-2`}
        onSubmit={(e) => {
          e.preventDefault();
          filterFunc(filter);
        }}
      >
        {isShown && (
          <button onClick={() => setOpen(false)}>
            <ArrowBackIcon />
          </button>
        )}

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
