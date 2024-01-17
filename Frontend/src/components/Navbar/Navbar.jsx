import styles from "./Navbar.module.css";

// IMPORT COMPONENTS
import Logo from "../Logo/Logo";
import Profile from "../Profile/Profile";

// CSS STYLES
const { mainDiv, splitNav, logoDiv } = styles;

const Navbar = () => {
  return (
    <div className={mainDiv}>
      <div className={splitNav}></div>
      <div className={logoDiv}>
        <Logo size={"2rem"} />
      </div>
      <div className={splitNav}>
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
