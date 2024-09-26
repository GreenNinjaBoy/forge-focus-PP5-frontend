import { useContext } from "react";
import {
    ShowGlobalSuccessContext, 
    SetShowGlobalSuccessContext, 
    GlobalSuccessMessageContext, 
    SetGlobalSuccessMessageContext 
} from "../contexts/GlobalMessageContext";

/**
 * Custom hook to access the context value for showing the global success message.
 * Returns the current state of whether the success message should be shown.
 */
export const useShowGlobalSuccess = () => useContext(ShowGlobalSuccessContext);

/**
 * Custom hook to access the context value for setting the visibility of the global success message.
 * Returns the function to set the visibility of the success message.
 */
export const useSetShowGlobalSuccess = () => useContext(SetShowGlobalSuccessContext);

/**
 * Custom hook to access the context value for the global success message content.
 * Returns the current global success message.
 */
export const useGlobalSuccessMessage = () => useContext(GlobalSuccessMessageContext);

/**
 * Custom hook to access the context value for setting the global success message content.
 * Returns the function to set the global success message.
 */
export const useSetGlobalSuccessMessage = () => useContext(SetGlobalSuccessMessageContext);