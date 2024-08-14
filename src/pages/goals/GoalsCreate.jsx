import { useRef, useState } from "react";
import { Button, Form, Image} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";



const GoalsCreate = () => {

    const [goalsData, setGoalsData] = useState ({
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

    const handleChange = (event) => {
        setGoalsData({
            ...goalsData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length > 0){
            URL.revokeObjectURL(image);
            setGoalsData({
                ...goalsData,
                image: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    



  return (
    <div>GoalsCreate</div>
  )
}

export default GoalsCreate