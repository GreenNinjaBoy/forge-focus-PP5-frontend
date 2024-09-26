import { createContext, useContext } from "react";

// Contexts for managing current user state
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

/**
 * Custom hook to access the current user context.
 * Returns the current user or null if the context is undefined.
 */
export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser === undefined ? null : currentUser;
};

/**
 * Custom hook to access the function to set the current user context.
 * Returns the function to set the current user.
 */
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);