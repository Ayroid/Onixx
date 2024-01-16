import { useState } from "react";
import axios from "axios";
import "../../css/form.css";

import InputField from "../../components/InputField/InputField";
import FormButton from "../../components/FormButton/FormButton";
import FormHeader from "../../components/FormHeader/FormHeader";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const REGISTER_URL = "http://localhost:3000/api/user/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    axios
      .post(REGISTER_URL, user)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mainDiv">
      <div className="logo">
        <img src="/logo/onixx.png" alt="logo" />
      </div>
      <form className="formBody" onSubmit={submitForm}>
        <FormHeader
          preHeadingText="Great "
          preHeadingSpanText="to have you back!"
          headingText="Login "
          headingSpanText="now"
          changePageText="Don't have an account? "
          changePageSpanText="SignUp"
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
        <FormButton id="registerButton" type="submit" text="Login" />
      </form>
    </div>
  );
};

export default Signin;
