import { createContext, useContext } from "react";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  return currentUser === undefined ? null : currentUser;
};
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);