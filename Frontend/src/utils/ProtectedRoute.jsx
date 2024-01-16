import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { refreshToken } from "./AuthService";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ path, children }) => {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const signUpPageRequested = path === "/signin" || path === "/signup";

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const jwtRefreshToken = localStorage.getItem("jwtRefreshToken");

        if (jwtRefreshToken == null && jwtToken == null) {
          setVerified(false);
          return;
        } else if (jwtToken == null) {
          await refreshToken().then((res) => {
            setVerified(res);
          });
        } else {
          await axios
            .get("http://localhost:3000/api/token/verify", {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .then((res) => {
              return res.status === 200;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (error) {
        await refreshToken().then((res) => {
          setVerified(res);
        });
      } finally {
        setLoading(false);
      }
    };
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
