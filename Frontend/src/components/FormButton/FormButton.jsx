import PropTypes from "prop-types";

const FormButton = ({ text, id, type }) => {
  return (
    <button
      id={id}
      type={type}
      className="mt-6 min-w-80 max-w-xl rounded bg-purple-900 p-2 font-bold"
    >
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
