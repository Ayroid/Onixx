import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Profile.module.css";

// CSS STYLES
const { mainDiv, profile, profileInfo, logout, userName } = styles;

const Profile = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropDown = () => {
    const dropdown = document.getElementById("dropDown");
    dropdown.style.display = "flex";
    dropdown.classList.remove(styles.dropDownAnimationReverse);
    dropdown.classList.add(styles.dropDownAnimation);
  };

  const closeDropDown = () => {
    const dropdown = document.getElementById("dropDown");
    dropdown.classList.remove(styles.dropDownAnimation);
    dropdown.classList.add(styles.dropDownAnimationReverse);
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 200);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const logOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtRefreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("messageId");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div className={mainDiv}>
      <img
        className={profile}
        src="/icons/profile.png"
        alt="profile"
        onClick={toggleDropdown}
      />
      <div className={profileInfo} id="dropDown">
        <div className={userName}>{username || "Username"}</div>
        <div className={logout} onClick={logOut}>
          Logout
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Profile;
