import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (data) => {
  const refreshToken = data?.refresh_token;
  if (refreshToken) {
    try {
      const refreshTokenTimestamp = jwtDecode(refreshToken).exp;
      localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp.toString());
    } catch (error) {
      console.error("Error decoding refresh token:", error);
    }
  }
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};