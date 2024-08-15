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

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/goal/${id}`);
            navigate('/GoalsArea')
        } catch(err) {
            console.log(err)
        }
    };



  return (
    <div>
        <div>
      <img src={image} alt='Goal Image'/>
      <div>
        <p>Are you sure you wish to delete your {name} goal?</p>
        <p>Deleting it will also result in all tasks within this goal being deleted!</p>
        <div>
          <Button onClick={handleCancel}>
            <div>
              Cancel
            </div>
          </Button>
          <Button onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default GoalsDelete
