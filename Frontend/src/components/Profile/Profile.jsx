import PropTypes from "prop-types";
import styles from "./Profile.module.css";

// CSS STYLES
const { mainDiv, profile } = styles;

const Profile = () => {
  return (
    <div className={mainDiv}>
      <img className={profile} src="/icons/profile.png" alt="profile" />
    </div>
  );
};

Profile.propTypes = {
  closeNavbar: PropTypes.func,
};

export default Profile;
