import { useState } from "react";
import axios from "axios";

import InputField from "../components/InputField";
import FormButton from "../components/FormButton";

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
      username: username,
      email: email,
      password: password,
    };

    axios
      .post(REGISTER_URL, user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <form className="rounded bg-slate-400 px-16 py-8" onSubmit={submitForm}>
        <h1 className="mb-8 text-center text-2xl font-bold">
          Log in to your account
        </h1>
        <InputField
          inputLabel="Username"
          type="text"
          id="username"
          value={username}
          valueUpdater={updateUsername}
          required={true}
        />
        <InputField
          inputLabel="Email"
          type="email"
          id="email"
          value={email}
          valueUpdater={updateEmail}
          required={true}
        />
        <InputField
          inputLabel="Password"
          type="password"
          id="password"
          value={password}
          valueUpdater={updatePassword}
          required={true}
        />
        <FormButton id="registerButton" type="submit" text="Register" />
      </form>
    </div>
  );
};

export default Signup;