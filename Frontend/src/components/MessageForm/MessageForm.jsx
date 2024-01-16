import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import styles from "./MessageForm.module.css";

import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import FormButton from "../FormButton/FormButton";

// CSS Styles
const { form } = styles;

const MessageForm = ({ buttonText }) => {
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");

  const updateHeading = (e) => {
    setHeading(e.target.value);
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  const resetStates = () => {
    setHeading("");
    setMessage("");
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const message = {
      heading,
      message,
    };

    axios
      .post("http://192.168.1.9:3000/api/message/", message)
      .then(() => {
        console.log("Message sent");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        resetStates();
      });
  };

  return (
    <form className={form} onSubmit={submitMessage}>
      <InputField
        id="headingField"
        type="text"
        value={heading}
        valueUpdater={updateHeading}
        required={true}
        inputLabel="Heading"
        placeholder=""
      />
      <TextAreaField
        id="messageField"
        cols="30"
        rows="10"
        placeholder=""
        value={message}
        valueUpdater={updateMessage}
        inputLabel="Message"
        required={true}
      />
      <FormButton id="messageFormButton" type="submit" text={buttonText} />
    </form>
  );
};

MessageForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default MessageForm;
