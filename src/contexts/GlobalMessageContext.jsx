/* This context will provide all compontents the 
abilitly to add a message and set the showGlobalSuccess 
function to be true. This will trigger a message that will
display to the user with the given message. this called
'SuccessMessage' which is nested within App.js */
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const ShowGlobalSuccessContext = createContext();
export const SetShowGlobalSuccessContext = createContext();
export const GlobalSuccessMessageContext = createContext();
export const SetGlobalSuccessMessageContext = createContext();

export const GlobalMessageProvider = ({ children }) => {
    const [showGlobalSuccess, setShowGlobalSuccess] = useState(false);
    const [globalSuccessMessage, setGlobalSuccessMessage] = useState("");

    useEffect(() => {
        // Closes the message after 5 seconds
        if (showGlobalSuccess) {
            const hideToast = () => {
                setShowGlobalSuccess(false);
                setGlobalSuccessMessage("");
            };
            const timer = setTimeout(() => {
                hideToast();
            }, 5000);
            // the code below clears the timeout function
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

GlobalMessageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
