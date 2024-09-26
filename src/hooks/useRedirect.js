import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook to handle redirection based on user authentication status.
 * Refreshes the authentication token on mount and redirects the user based on their authentication status.
 */
export const useRedirect = (userAuthStatus, currentUser) => {
  // Get the navigate function from react-router-dom to programmatically navigate
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle component mount and refresh the authentication token
    const handleMount = async () => {
      try {
        // Attempt to refresh the authentication token
        await axios.post("/dj-rest-auth/token/refresh/");
        // If the user is supposed to be logged in and there is a current user, navigate to the home page
        if (userAuthStatus === "loggedIn" && currentUser) {
          navigate("/");
        }
      } catch {
        // If the user is supposed to be logged out and there is no current user, navigate to the home page
        if (userAuthStatus === "loggedOut" && !currentUser) {
          navigate("/");
        }
      }
    };

    // Call the handleMount function on component mount
    handleMount();
  }, [navigate, userAuthStatus, currentUser]);
};