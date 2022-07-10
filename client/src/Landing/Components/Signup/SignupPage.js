import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import LabeledInput from "../General/LabeledInput";

const SignupPage = () => {
  const { email, password, userName, formValid, handleChange } = useForm();

  const submitHandler = (e) => {
    e.preventDefault();
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
          disabled={!formValid}
          onSubmit={submitHandler}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
