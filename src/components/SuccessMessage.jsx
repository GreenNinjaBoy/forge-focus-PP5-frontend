import { Toast } from "react-bootstrap";
import messageStyles from "../styles/Message.module.css";
import {
  useGlobalSuccessMessage,
  useSetGlobalSuccessMessage,
  useSetShowGlobalSuccess,
  useShowGlobalSuccess
} from "../hooks/useGlobalSuccess";

/**
 * SuccessMessage component for displaying global success messages.
 * Uses custom hooks to manage the visibility of messages to the user.
 */
const SuccessMessage = () => {
  // Get the current state of whether the success message should be shown
  const showGlobalSuccess = useShowGlobalSuccess();
  
  // Get the function to set the visibility of the success message
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  
  // Get the current global success message
  const globalSuccessMessage = useGlobalSuccessMessage();
  
  // Get the function to set the global success message
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  // Function to handle hiding the success message
  const handleHide = () => {
    setShowGlobalSuccess(false);
    setGlobalSuccessMessage("");
  }

  return (
    <Toast show={showGlobalSuccess} onClose={handleHide} className={messageStyles.Toast}>
      <Toast.Header className={messageStyles.Header}>
        <strong className={messageStyles.Title}>Success!!</strong>
      </Toast.Header>
      <Toast.Body className={messageStyles.Body}>{globalSuccessMessage}</Toast.Body>
    </Toast>
  )
}

export default SuccessMessage;