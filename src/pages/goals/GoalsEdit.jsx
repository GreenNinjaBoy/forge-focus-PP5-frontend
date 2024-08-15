import { useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Form, Image} from "react-bootstrap";



const GoalsEdit = (props) => {
    const {
        id,
        name,
        reason,
        setGoalState,
        setGoalData,
    } = props;

    
  return (
    <div>GoalsEdit</div>
  )
}

export default GoalsEdit
