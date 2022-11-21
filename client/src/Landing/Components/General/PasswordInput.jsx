import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import React, { useState } from "react";

const PasswordInput = ({ handleChange, password, showHelperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl variant="standard" sx={{ input: { color: "#ffff" }, label: { color: "#fff" } }}>
      <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChange}
        name="password"
        aria-describedby="outlined-password-helper-text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              sx={{ color: "white" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {showHelperText ? (
        <FormHelperText id="outlined-password-helper-text" sx={{ color: "#ccc" }}>
          *Must be at least 8 characters
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default PasswordInput;
