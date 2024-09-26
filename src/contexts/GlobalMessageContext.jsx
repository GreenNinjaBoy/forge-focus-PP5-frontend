/* This context will provide all components the 
ability to add a message and set the showGlobalSuccess 
function to be true. This will trigger a message that will
display to the user with the given message. This is called
'SuccessMessage' which is nested within App.js */

import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

// Contexts for managing global success message state
export const ShowGlobalSuccessContext = createContext();
export const SetShowGlobalSuccessContext = createContext();
export const GlobalSuccessMessageContext = createContext();
export const SetGlobalSuccessMessageContext = createContext();

/**
 * GlobalMessageProvider component for managing and providing global success message context.
 */

export const GlobalMessageProvider = ({ children }) => {
    // State to manage the visibility of the global success message
    const [showGlobalSuccess, setShowGlobalSuccess] = useState(false);
    
    // State to manage the content of the global success message
    const [globalSuccessMessage, setGlobalSuccessMessage] = useState("");

    useEffect(() => {
        // Closes the message after 5 seconds if it is shown
        if (showGlobalSuccess) {
            const hideToast = () => {
                setShowGlobalSuccess(false);
                setGlobalSuccessMessage("");
            };
            const timer = setTimeout(() => {
                hideToast();
            }, 5000);
            // Clears the timeout function to prevent memory leaks
            return () => {
                clearTimeout(timer);
            };
        }
    }, [showGlobalSuccess]);

    return (
        <ShowGlobalSuccessContext.Provider value={showGlobalSuccess}>
            <SetShowGlobalSuccessContext.Provider value={setShowGlobalSuccess}>
                <GlobalSuccessMessageContext.Provider value={globalSuccessMessage}>
                    <SetGlobalSuccessMessageContext.Provider value={setGlobalSuccessMessage}>
                        {children}
                    </SetGlobalSuccessMessageContext.Provider>
                </GlobalSuccessMessageContext.Provider>
            </SetShowGlobalSuccessContext.Provider>
        </ShowGlobalSuccessContext.Provider>
    );
};

// Define prop types for the GlobalMessageProvider component
GlobalMessageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};