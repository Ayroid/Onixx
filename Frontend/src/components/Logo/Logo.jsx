import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

// CSS STYLES
const logoImage = [styles.logoImage].join("");

// COMPONENT

const Logo = ({ size }) => {
  return (
    <Link to="/">
      <img
        className={logoImage}
        src="/logo/onixx.png"
        alt="logo"
        style={{ height: size }}
      />
    </Link>
  );
};

Logo.propTypes = {
  size: PropTypes.string,
};

export default Logo;
