import { Button } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";


const GoalsDelete = (props) => {
    const {
        id,
        name,
        image,
        setGoalsSate,
    } = props;

    const navigate = useNavigate();

    const handleCancel = () => {
        setGoalsSate('view');
    };

    

  return (
    <div>GoalsDelete</div>
  )
}

export default GoalsDelete
