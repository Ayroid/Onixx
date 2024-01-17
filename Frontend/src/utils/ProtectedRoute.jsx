import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ path, children }) => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const signUpPageRequested = path === "/signin" || path === "/signup";

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("jwtRefreshToken");

      const response = await axios.get(
        "http://192.168.1.9:3000/api/token/refresh",
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      if (response.status === 200) {
        const newToken = response.data.token;
        localStorage.setItem("jwtToken", newToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const verifyToken = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const jwtRefreshToken = localStorage.getItem("jwtRefreshToken");

    if (jwtRefreshToken == null && jwtToken == null) {
      setVerified(false);
      setLoading(false);
    } else if (jwtToken == null) {
      await refreshToken().then((res) => {
        setVerified(res);
        setLoading(false);
      });
    } else {
      await axios
        .get("http://192.168.1.9:3000/api/token/verify", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          return res.status === 200 ? setVerified(true) : setVerified(false);
        })
        .catch(async (err) => {
          console.log(err);
          await refreshToken().then((res) => {
            setVerified(res);
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    verifyToken();
  });

  // ---------------------------- RETURN ----------------------------

  if (!loading) {
    if (signUpPageRequested && verified) {
      return <Navigate to="/" />;
    } else if (!signUpPageRequested && !verified) {
      return <Navigate to="/signin" />;
    } else {
      return children;
    }
  }
};

// ---------------------------- PROPS ----------------------------

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

// ---------------------------- EXPORT ----------------------------

export default ProtectedRoute;
