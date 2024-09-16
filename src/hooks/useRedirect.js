import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus, currentUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn" && currentUser) {
          navigate("/");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut" && !currentUser) {
          navigate("/");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus, currentUser]);
};