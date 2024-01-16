import PropTypes from "prop-types";
import styles from "./Message.module.css";

// CSS Styles
const { mainDiv, headingStyle, contentStyle } = styles;

const Message = ({ heading, content, highlightColor }) => {
  return (
    <div
      className={mainDiv}
      style={{ borderBottomColor: highlightColor || "white" }}
    >
      <div className={headingStyle}>{heading}</div>
      <div className={contentStyle}>{content}</div>
    </div>
  );
};

Message.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  highlightColor: PropTypes.string,
};

export default Message;
