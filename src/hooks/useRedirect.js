import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus, currentUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser === undefined) return; // Wait until the currentUser is defined

      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        // if user is logged in, the code below will run
        if (userAuthStatus === "loggedIn" && currentUser) {
          navigate("/home");
        }
      } catch (err) {
        // if user is not logged in, the code below will run
        if (userAuthStatus === "loggedOut" && !currentUser) {
          navigate("/about");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus, currentUser]);
};