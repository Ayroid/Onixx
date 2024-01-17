import axios from "axios";
import PropTypes from "prop-types";
import styles from "./Message.module.css";

// CSS Styles
const { mainDiv, headingStyle, contentStyle, deleteButton } = styles;

const deleteMessage = () => {
  axios
    .delete("http://192.168.1.9:3000/api/message/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      localStorage.removeItem("messageId");
    })
    .catch(() => {});
};

const Message = ({ heading, content, user }) => {
  return (
    <div
      className={mainDiv}
      style={{ borderBottomColor: user ? "var(--highlight)" : "white" }}
    >
      <div className={headingStyle}>{heading}</div>
      <div className={contentStyle}>{content}</div>
      {user && (
        <img
          className={deleteButton}
          src="/icons/delete.png"
          alt="delete"
          onClick={deleteMessage}
        />
      )}
    </div>
  );
};

Message.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  user: PropTypes.bool.isRequired,
};

export default Message;
