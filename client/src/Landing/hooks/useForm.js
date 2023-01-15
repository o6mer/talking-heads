import { useEffect, useState } from "react";

const useForm = (mode) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    if (!e.target) return;

    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "userName") setUserName(e.target.value);
  };

  useEffect(() => {
    if (mode === "signup") {
      if (userName && password && email) return setFormValid(true);

      return setFormValid(false);
    }

    if (password && email) return setFormValid(true);

    setFormValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, userName]);
  return {
    email,
    password,
    userName,
    formValid,
    handleChange,
  };
};

export default useForm;
