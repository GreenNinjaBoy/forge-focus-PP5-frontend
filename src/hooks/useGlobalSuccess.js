import { useContext } from "react";
import { ShowGlobalSuccessContext, SetShowGlobalSuccessContext, GlobalSuccessMessageContext, SetGlobalSuccessMessageContext } from "../contexts/GlobalMessageContext";

export const useShowGlobalSuccess = () => useContext(ShowGlobalSuccessContext);
export const useSetShowGlobalSuccess = () => useContext(SetShowGlobalSuccessContext);
export const useGlobalSuccessMessage = () => useContext(GlobalSuccessMessageContext);
export const useSetGlobalSuccessMessage = () => useContext(SetGlobalSuccessMessageContext);