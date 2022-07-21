import React, { useEffect, useState } from "react";
import validator from "validator";

const useForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    if (!e.target) return;

    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "userName") setUserName(e.target.value);

    // console.log(email, password);
  };

  useEffect(() => {
    if (password.length >= 8 && validator.isEmail(email)) {
      setPasswordValid(true);
      return setEmailValid(true);
    }

    setEmailValid(false);
    setPasswordValid(false);
  }, [email, password]);

  useEffect(() => {
    if (emailValid && passwordValid) return setFormValid(true);
    setFormValid(false);
  }, [emailValid, passwordValid]);

  return { email, password, userName, formValid, handleChange };
};

export default useForm;
