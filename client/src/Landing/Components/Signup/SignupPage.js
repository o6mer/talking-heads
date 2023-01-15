import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import useForm from "../../hooks/useForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { TextField, Tooltip, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PasswordInput from "../General/PasswordInput";

import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const SignupPage = () => {
  const { email, password, userName, formValid, handleChange } =
    useForm("signup");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(undefined);
  const [file64, setFile64] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState(undefined);
  // eslint-disable-next-line no-unused-vars
  const [isValid, setIsValid] = useState(false);

  const clearImage = () => {
    setPreviewUrl();
    setFile();
  };
  const pickHandler = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      const pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      setFile64(fileReader.result.replace("data:", "").replace(/^.+,/, ""));
    };

    fileReader.readAsDataURL(file);
  }, [file]);

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
            profilePicture: file64,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      data = await response.json();
      if (response.ok) {
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
        <div className="flex gap-2">
          <Link to="/login" className="w-min">
            <Tooltip title="Back to Login">
              <ArrowBackIcon className="hover:fill-gray-300" />
            </Tooltip>
          </Link>
          <Link to="/" className="w-min">
            <Tooltip title="Back to main page">
              <HomeIcon className="hover:fill-gray-300" />
            </Tooltip>
          </Link>
        </div>
        <p className="font-bold text-3xl text-center">Signup</p>
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col gap-2 justify-around pt-3"
        >
          <div className="flex items-center justify-center">
            <div className="relative">
              <label className="hover:cursor-pointer ">
                {previewUrl ? (
                  <div className="">
                    <div className="border border-primary rounded-lg hover:border-thirdy transition-all ">
                      <img
                        className="ml-auto rounded-lg shadow-md w-20 h-20"
                        src={previewUrl}
                        alt="preview"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="ml-auto text-sm w-20 h-20 border-2 rounded-lg text-center hover:text-thirdy flex items-center justify-center transition-all">
                    <AddAPhotoOutlinedIcon fontSize="large" />
                  </div>
                )}{" "}
                <input
                  className="hidden"
                  type="file"
                  accept=".jpg"
                  onChange={pickHandler}
                  id="imgPicker"
                />
              </label>
              <div
                className="absolute right-0 bottom-0 hover:cursor-pointer translate-x-4 translate-y-4 rounded-full text-red-600 hover:text-red-800"
                onClick={clearImage}
              >
                {previewUrl && <HighlightOffIcon />}
              </div>
            </div>
          </div>
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
