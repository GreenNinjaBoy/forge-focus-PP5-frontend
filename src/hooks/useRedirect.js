import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const useRedirect = (userAuthStatus) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleMount = async () => {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            // if user is logged in, the code below will run
            if (userAuthStatus === "loggedIn") {
              navigate("/home");
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