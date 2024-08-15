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

    const [newData, setNewData] = useState({
        newName: name;
        newReason: reason;
        newImage: image;     
    });
    
    const { newName, newReason, newImage} = newData;

    const [errors, setErrors] = useState({});

    const imageInput = useRef(null);

    const handleChange = (event) => {
        setNewData({
            ...newData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length > 0){
            URL.revokeObjectURL(image);
            setNewData({
                ...newData,
                newImage: URL.createObjectURL(event.target.files[0])
            });
        }
    };

    
  return (
    <div>GoalsEdit</div>
  )
}

export default GoalsEdit
