import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus, currentUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn" && currentUser) {
          navigate("/");
        }
      } catch {
        if (userAuthStatus === "loggedOut" && !currentUser) {
          navigate("/");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus, currentUser]);
};