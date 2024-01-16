import { useState } from "react";
import axios from "axios";
import "../../css/form.css";

import InputField from "../../components/InputField/InputField";
import FormButton from "../../components/FormButton/FormButton";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const REGISTER_URL = "http://192.168.1.9:3000/api/user/register";

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

  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
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
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        resetStates();
      });
  };

  return (
    <div className="mainDiv">
      <div className="logo">
        <img src="/logo/onixx.png" alt="logo" />
      </div>
      <form className="formBody" onSubmit={submitForm}>
        <FormHeader
          preHeadingText="Join "
          preHeadingSpanText="the crew"
          headingText="Create new "
          headingSpanText="account"
          changePageText="Already have an account? "
          changePageSpanText="Signin"
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
