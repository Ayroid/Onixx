import styles from "./AddButton.module.css";

// CSS Styles
const { addButton } = styles;

const AddButton = () => {
  return <img className={addButton} src="/icons/plus.png" alt="addButton" />;
};

export default AddButton;
