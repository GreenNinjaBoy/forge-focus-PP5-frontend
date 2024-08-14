import { useRef, useState } from "react";
import { Button, Form, Image} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";



const GoalsCreate = () => {

    const [goalsData, setGoalData] = useState ({
        name:'',
        reason:'',
        image:'',
    });

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const [errors, setErrors] = useState({});

    const {name, reason, image} = goalsData;

    const imageInput = useRef(null);

    



  return (
    <div>GoalsCreate</div>
  )
}

export default GoalsCreate