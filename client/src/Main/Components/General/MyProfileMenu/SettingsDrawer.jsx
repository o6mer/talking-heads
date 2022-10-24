import { Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContextProvider";

const SettingsDrawer = () => {
  const [mode, setMode] = useState("light");

  const { darkMode, setDarkMode } = useContext(UserContext);

  const handleChange = (event, newMode) => {
    if (newMode === null) return;
    setDarkMode(newMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-700" : "bg-white"
      } w-full h-full flex flex-col`}
    >
      <p className={`p-3 text-xl ${darkMode ? "text-white" : "text-black"}`}>
        Settings
      </p>

      <Divider />

      <ToggleButtonGroup
        value={darkMode}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        className={`p-3 `}
      >
        <ToggleButton
          value={false}
          color="primary"
          sx={{ color: `${darkMode ? "white" : "black"}`, fontWeight: "bold" }}
        >
          Light Mode
        </ToggleButton>
        <ToggleButton
          value={true}
          color="primary"
          sx={{ color: `${darkMode ? "white" : "black"}`, fontWeight: "bold" }}
        >
          Dark Mode
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default SettingsDrawer;
