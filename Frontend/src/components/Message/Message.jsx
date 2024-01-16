import PropTypes from "prop-types";
import styles from "./Message.module.css";

// CSS Styles
const { mainDiv } = styles;

const Message = ({ content, highlightColor }) => {
  return (
    <div
      className={mainDiv}
      style={{ borderBottomColor: highlightColor || "white" }}
    >
      {content}
    </div>
  );
};

Message.propTypes = {
  content: PropTypes.string.isRequired,
  highlightColor: PropTypes.string,
};

export default Message;
