import { jwtDecode } from "jwt-decode";

export const setTokens = (data) => {
    console.log("setTokens called with data:", data);
    if (data?.access) {
        localStorage.setItem("accessToken", data.access);
        console.log("Access token set:", data.access);
    } else {
        console.error("No access token in data");
    }
    if (data?.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
        console.log("Refresh token set:", data.refresh);
        const refreshTokenTimestamp = jwtDecode(data.refresh).exp;
        localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
        console.log("Refresh token timestamp set:", refreshTokenTimestamp);
    } else {
        console.error("No refresh token in data");
    }
};

export const shouldRefreshToken = () => {
    const timestamp = localStorage.getItem('refreshTokenTimestamp');
    if (!timestamp) return false;
    // Refresh if less than 5 minutes left before expiry
    return Date.now() >= (timestamp * 1000) - (5 * 60 * 1000);
};

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const removeTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenTimestamp");
};