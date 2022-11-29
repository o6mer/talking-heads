import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import useForm from "../../hooks/useForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Tooltip, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PasswordInput from "../General/PasswordInput";

const SignupPage = () => {
  const {
    email,
    password,
    userName,
    profilePictureUrl,
    formValid,
    handleChange,
  } = useForm("signup");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) return alert(errorMessage);
    setIsError(false);
    setErrorMessage("");
  }, [isError, errorMessage]);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    let data;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            userName,
            email,
            password,
            profilePictureUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      data = await response.json();
      if (response.ok) {
        console.log(data.user);
        setUser(data.user);
        navigate("/main");
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      return;
    }

    // setUser(data);
  };

  return (
    <div className="flex justify-center items-center h-screen background-picture  bg-cover overflow-hidden">
      <div className="flex flex-col  bg-fourthy text-white p-8 rounded-md w-[25%] max-w-[500px] min-w-[400px] transition-all shadow-xl">
        <Link to="/login" className="w-min">
          <Tooltip title="Back to Login">
            <ArrowBackIcon className="hover:fill-gray-300" />
          </Tooltip>
        </Link>
        <p className="font-bold text-3xl text-center">Signup</p>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col gap-2 justify-around "
        >
          <TextField
            autoFocus
            onChange={handleChange}
            type="text"
            name="userName"
            label="User Name"
            fullWidth
            variant="standard"
            sx={{ input: { color: "#ffff" }, label: { color: "#fff" } }}
          />

          <TextField
            autoFocus
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
            showHelperText={true}
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
              SIGNUP
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
