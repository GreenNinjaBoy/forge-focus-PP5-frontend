import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, clearAuthToken } from "../pages/utils/Auth";

export const useRedirect = (userAuthStatus) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
            const token = getAuthToken();
            if (token) {
                try {
                    await axios.post("dj-rest-auth/token/refresh/");
                    if (userAuthStatus === "loggedIn") {
                        navigate("/home");
                    }
                } catch (err) {
                    clearAuthToken();
                    if (userAuthStatus === "loggedOut") {
                        navigate("/signin");
                    }
                }
            } else {
                if (userAuthStatus === "loggedOut") {
                    navigate("/signin");
                }
            }
        };

        handleMount();
    }, [navigate, userAuthStatus]);
};