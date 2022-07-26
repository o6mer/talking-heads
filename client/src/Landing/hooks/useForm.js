import React, { useEffect, useState } from "react";
import validator from "validator";

const useForm = (mode) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);
  const [profilePictureUrlValid, setProfilePictureUrlValid] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    if (!e.target) return;

    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "userName") setUserName(e.target.value);
    if (e.target.name === "profilePictureUrl")
      setProfilePictureUrl(e.target.value);
    console.log(profilePictureUrl);

    // console.log(email, password);
  };

  useEffect(() => {
    if (mode === "signup") {
      if (userName && profilePictureUrl && password && email) {
        setUserNameValid(true);
        setProfilePictureUrlValid(true);
        setPasswordValid(true);
        setEmailValid(true);
        return;
      }
      setEmailValid(false);
      setPasswordValid(false);
      setUserNameValid(false);
      setProfilePictureUrlValid(false);
      return;
    }

    if (password && email) {
      setPasswordValid(true);
      setEmailValid(true);
      return;
    }

    setEmailValid(false);
    setPasswordValid(false);
    // setUserNameValid(false);
    // setProfilePictureUrlValid(false);
  }, [email, password, userName, profilePictureUrl]);

  useEffect(() => {
    if (mode === "signup")
      if (
        emailValid &&
        passwordValid &&
        userNameValid &&
        profilePictureUrlValid
      )
        return setFormValid(true);

    if (emailValid && passwordValid) return setFormValid(true);
    //   setFormValid(true)
    setFormValid(false);
  }, [emailValid, passwordValid, userNameValid, profilePictureUrlValid]);

  return {
    email,
    password,
    userName,
    profilePictureUrl,
    formValid,
    handleChange,
  };
};

export default useForm;
