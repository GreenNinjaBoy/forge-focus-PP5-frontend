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

     const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new formData();
        formData.append('name', newName)
        formData.append('reason', newReason)
        if (imageInput.current.files.lenght > 0) {
            formData.append('image', imageInput.current.files [0]);
        }
        try {
            const {data} = await axiosReq.put(`goals/${id}`, formData);
            setGoalData(data);
            setGoalState('view');
        } catch(err){
            if (err.response?.status !== 401){
                setErrors(err.response?.data)
            }
        }
     };

     const handleCancel = () => {
        setGoalState('view');
     };
     
  return (
    <div>GoalsEdit</div>
  )
}

export default GoalsEdit
