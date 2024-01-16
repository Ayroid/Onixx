import axios from "axios";

const refreshTokenURL = "http://localhost:3000/api/token/refresh";

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("jwtRefreshToken");

    const response = await axios.get(refreshTokenURL, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.status === 200) {
      const newToken = response.data.token;
      localStorage.setItem("jwtToken", newToken);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export { refreshToken };
