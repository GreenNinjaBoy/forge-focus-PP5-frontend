import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
      const handleMount = async () => {
          try {
              const refreshToken = localStorage.getItem("refreshToken");
              if (refreshToken) {
                  await axios.post("/dj-rest-auth/token/refresh/", {
                      refresh: refreshToken
                  });
                  // if user is logged in, the code below will run
                  if (userAuthStatus === "loggedIn") {
                      navigate("/home");
                  }
              } else {
                  throw new Error("No refresh token");
              }
          } catch (err) {
              // if user is not logged in, the code below will run
              if (userAuthStatus === "loggedOut") {
                  navigate("/about");
              }
          }
      };

      handleMount();
  }, [navigate, userAuthStatus]);
};