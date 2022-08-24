import React, { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import LabeledInput from "../General/LabeledInput";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import { Button, Link, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SignupPage from "../Signup/SignupPage";

const LoginPage = () => {
  const { email, password, formValid, handleChange } = useForm("login");

  const [loading, setLoading] = useState(false);

  const setUser = useContext(UserContext).setUser;

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        navigate("/main/1");
      } else throw new Error(data.message);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col gap-3 bg-[#f1f1f1] p-8 rounded-md w-[30%] max-w-[1000px]">
        <p className="font-bold text-3xl">Please login to start chatting</p>

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
          />

          <TextField
            autoFocus
            margin="dense"
            onChange={handleChange}
            type="password"
            name="password"
            label="Password"
            fullWidth
            variant="standard"
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
              // onClick={submitHandler}
            >
              Login
            </Button>
          )}
        </form>
        <div className="text-center">
          <RouterLink
            to="/forgotPassword"
            className="text-[#1976d2] underline decoration-[#4986c28e]  hover:decoration-[#1976d2]"
          >
            Forgot Password?
          </RouterLink>
        </div>
        <span className="flex gap-1.5 mt-2">
          Don't have an account?
          <RouterLink
            to="/signup"
            className="text-[#1976d2] underline decoration-[#4986c28e]  hover:decoration-[#1976d2]"
          >
            Signup
          </RouterLink>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
