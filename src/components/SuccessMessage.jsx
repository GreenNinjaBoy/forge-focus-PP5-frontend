import { Toast } from "react-bootstrap";
import messageStyles from "../styles/Message.module.css";
import {
  useGlobalSuccessMessage,
  useSetGlobalSuccessMessage,
  useSetShowGlobalSuccess,
  useShowGlobalSuccess } from "../hooks/useGlobalSuccess";

const SuccessMessage = () => {
  const showGlobalSuccess = useShowGlobalSuccess();
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const globalSuccessMessage = useGlobalSuccessMessage();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

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