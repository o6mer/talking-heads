import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../../../Landing/hooks/useAuth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PasswordInput from "../General/PasswordInput";

const LoginPage = () => {
  const { email, password, formValid, handleChange } = useForm("login");

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const setUser = useContext(UserContext).setUser;

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.user);
        navigate("/main");
      } else throw new Error(data.message);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen background-picture bg-cover ">
      <div className="flex flex-col gap-3 bg-fourthy p-8 rounded-md w-[25%] max-w-[500px] min-w-[400px] text-white shadow-xl">
        <p className="font-bold text-3xl ">Please login to start chatting</p>

        <form className="w-[100%] flex flex-col gap-2" onSubmit={submitHandler}>
          <TextField
            autoFocus
            margin="dense"
            onChange={handleChange}
            type="email"
            name="email"
            label="Email"
            fullWidth
            variant="standard"
            sx={{ input: { color: "#ffff" }, label: { color: "#fff" } }}
          />

          <PasswordInput
            password={password}
            handleChange={handleChange}
            showHelperText={false}
          />

          {loading ? (
            <LoadingButton
              onClick={() => {}}
              loading={true}
              variant="outlined"
              disabled
            >
              disabled
            </LoadingButton>
          ) : (
            <Button
              margin="normal"
              variant="contained"
              type="submit"
              disabled={!formValid}
              fullWidth
              color="primary"
            >
              Login
            </Button>
          )}
        </form>
        <div className="text-center">
          <RouterLink
            to="/forgotPassword"
            className="text-[#4b98e6] underline decoration-[#4986c28e]  hover:decoration-[#1976d2]"
          >
            Forgot Password?
          </RouterLink>
        </div>
        <span className="flex gap-1.5 mt-2">
          Don't have an account?
          <RouterLink
            to="/signup"
            className="text-[#4b98e6] underline decoration-[#4986c28e]  hover:decoration-[#1976d2]"
          >
            Signup
          </RouterLink>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
