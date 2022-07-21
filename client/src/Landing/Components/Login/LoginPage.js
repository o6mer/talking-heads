import React, { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import LabeledInput from "../General/LabeledInput";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";

const LoginPage = () => {
  const { email, password, formValid, handleChange } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useContext(UserContext).setUser;

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

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
        setUser(data);
        navigate("/main/1");
      } else setErrorMessage(data.message + "hi");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!errorMessage === "") alert(errorMessage);
  }, [errorMessage]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action=""
        className="flex flex-col gap-4 bg-gray-400 p-8 rounded-md"
        onSubmit={submitHandler}
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
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold p-1 text-center disabled:bg-blue-400"
          // disabled={!formValid}
          // onClick={submitHandler}
        >
          Login
        </button>
        <Link
          className="bg-blue-700 text-white font-bold p-1 text-center disabled:bg-blue-400"
          to="/signup"
        >
          Signup
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
