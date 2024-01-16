import { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";

import InputField from "../../components/InputField/InputField";
import FormButton from "../../components/FormButton/FormButton";
import FormHeader from "../../components/FormHeader/FormHeader";

// CSS STYLES
const { mainDiv, formBody, logo } = styles;

const Signup = () => {
  const REGISTER_URL = "http://localhost:3000/api/user/register";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    axios
      .post(REGISTER_URL, user)
      .then(() => {
        console.log("User registered successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={mainDiv}>
      <div className={logo}>
        <img src="/logo/onixx.png" alt="logo" />
      </div>
      <form className={formBody} onSubmit={submitForm}>
        <FormHeader
          preHeadingText="Join "
          preHeadingSpanText="the crew"
          headingText="Create new "
          headingSpanText="account"
          changePageText="Already have an account? "
          changePageSpanText="Login"
        />
        <InputField
          id="username"
          type="text"
          value={username}
          valueUpdater={updateUsername}
          required={true}
          inputLabel="Username"
          placeholder=""
        />
        <InputField
          id="email"
          type="email"
          value={email}
          valueUpdater={updateEmail}
          required={true}
          inputLabel="Email"
          placeholder=""
        />
        <InputField
          id="password"
          type="password"
          value={password}
          valueUpdater={updatePassword}
          required={true}
          inputLabel="Password"
          placeholder=""
        />
        <FormButton id="registerButton" type="submit" text="Register" />
      </form>
    </div>
  );
};

export default Signup;
