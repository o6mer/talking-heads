import LoadingButton from "@mui/lab/LoadingButton";
import { Button, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/user/forgotPassword", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEmailExists(true);
        // navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen background-picture bg-cover text-white">
      <div className="flex flex-col gap-3 bg-fourthy p-8 rounded-md w-[25%] max-w-[500px] min-w-[400px]">
        <Link to="/login" className="w-min">
          <Tooltip title="Back to Login">
            <ArrowBackIcon className="hover:fill-gray-500" />
          </Tooltip>
        </Link>
        {emailExists ? (
          <>
            <p className="font-bold text-3xl text-center">Password Reset</p>
            <p>
              Email was sent to <b>{email}</b> with a link to reset your password
            </p>
          </>
        ) : (
          <>
            <Link to="/login" className="w-min">
              <Tooltip title="Back to Login">
                <ArrowBackIcon className="hover:fill-gray-500" />
              </Tooltip>
            </Link>
            <p className="font-bold text-3xl text-center">Please enter your Email</p>

            <form className="w-[100%] flex flex-col gap-2" onSubmit={submitHandler}>
              <TextField
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
                margin="dense"
                type="email"
                name="email"
                label="Email"
                fullWidth
                variant="standard"
                sx={{ input: { color: "#ffff" }, label: { color: "#fff" } }}
              />
              {loading ? (
                <LoadingButton onClick={() => {}} loading={true} variant="outlined" disabled>
                  disabled
                </LoadingButton>
              ) : (
                <Button
                  margin="normal"
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={!email}
                  // onClick={submitHandler}
                >
                  Reset Password
                </Button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
