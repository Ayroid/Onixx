import PropTypes from "prop-types";

const InputField = ({
  id,
  type,
  value,
  valueUpdater,
  inputLabel,
  required,
}) => {
  return (
    <div className="group relative mt-1.5 flex flex-col">
      <label className="target font-semibold" htmlFor={id}>
        {inputLabel}
      </label>
      <input
        className="text-left trigger min-w-80 rounded border-none px-2 py-1 font-semibold text-black outline-none"
        type={type}
        id={id}
        value={value}
        onChange={valueUpdater}
        required={required}
      />
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueUpdater: PropTypes.func.isRequired,
  inputLabel: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default InputField;
