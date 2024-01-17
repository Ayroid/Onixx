import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

import styles from "./MessageForm.module.css";

import useFetch from "../../hooks/useFetch";

import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import FormButton from "../FormButton/FormButton";

// CSS Styles
const { mainDiv, contentDiv, crossButton, form, headingStyle } = styles;

const MessageForm = ({ buttonText, closeForm }) => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const { refetchMessages } = useFetch({
    url: "http://192.168.1.9:3000/api/message/",
  });

  const updateHeading = (e) => {
    setHeading(e.target.value);
  };

  const updateContent = (e) => {
    setContent(e.target.value);
  };

  const resetStates = () => {
    setHeading("");
    setContent("");
  };

  const closeMessageForm = () => {
    closeForm();
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const data = {
      heading,
      content,
    };

    axios
      .post("http://192.168.1.9:3000/api/message/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        resetStates();
        closeMessageForm();
        refetchMessages();
      });
  };

  return (
    <div className={mainDiv}>
      <div className={contentDiv}>
        <img
          className={crossButton}
          src="/icons/plus.png"
          alt="addButton"
          onClick={closeMessageForm}
        />
        <h2 className={headingStyle}>Secret</h2>
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
            value={content}
            valueUpdater={updateContent}
            inputLabel="Message"
            required={true}
          />
          <div style={{ marginTop: "1rem" }}></div>
          <FormButton id="messageFormButton" type="submit" text={buttonText} />
        </form>
      </div>
    </div>
  );
};

MessageForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default MessageForm;
