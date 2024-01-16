import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

// CSS STYLES
const { mainDiv, heading, subHeading, button } = styles;

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={mainDiv}>
      <h1 className={heading}>404</h1>
      <h2 className={subHeading}>Page Not Found!</h2>
      <button
        className={button}
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
