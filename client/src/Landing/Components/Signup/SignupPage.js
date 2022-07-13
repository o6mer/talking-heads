import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import LabeledInput from "../General/LabeledInput";

const SignupPage = () => {
  const { email, password, userName, formValid, handleChange } = useForm();

  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) return alert(errorMessage);
    setIsError(false);
    setErrorMessage("");
  }, [isError, errorMessage]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let data;
    try {
      const response = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ userName, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        data = await response.json();
        navigate("/main/1");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
      return;
    }

    setUser(data);
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action=""
        className="flex flex-col gap-4 bg-gray-400 p-8 rounded-md"
      >
        <LabeledInput
          labelText="Email Address"
          type="email"
          handleChange={handleChange}
          state={email}
          name="email"
        />
        <LabeledInput
          labelText="Password"
          type="password"
          handleChange={handleChange}
          state={password}
          name="password"
        />
        <LabeledInput
          labelText="User Name"
          type="text"
          handleChange={handleChange}
          state={userName}
          name="userName"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold p-1 text-center disabled:bg-blue-400"
          // disabled={!formValid}
          onClick={submitHandler}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
