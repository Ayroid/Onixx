import PropTypes from "prop-types";
import styles from "./FormButton.module.css";

// CSS Styles
const formButton = styles.formButton;

const FormButton = ({ text, id, type }) => {
  return (
    <button id={id} type={type} className={formButton}>
      {text}
    </button>
  );
};

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FormButton;
