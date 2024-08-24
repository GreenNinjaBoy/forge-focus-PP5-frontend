import { useRef, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Button, Form, Image} from "react-bootstrap";
import PropTypes from "prop-types";


const GoalsEdit = (props) => {
    const {
        id,
        name,
        reason,
        image,
        setGoalState,
        setGoalData,
    } = props;

    const [newData, setNewData] = useState({
        newName: name,
        newReason: reason,
        newImage: image,     
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
    <Form onSubmit={handleSubmit}>
      <div>

        <Form.Group controlId="refine-new-image">
          <Image src={newImage}  alt='refinement'/>
          <Form.File
            id="image-upload"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInput}
            aria-label='Click to change goal image'
          />
        </Form.Group>
        <div>
          <div>

            <div>
              <div>
              </div>
              <Form.Group controlId="goal-new-name">
                <Form.Label>Goal:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Rename your Goal"
                  name="newName"
                  value={newName}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div>
              <div>
              </div>
              <Form.Group controlId="goal-new-reason">
                <Form.Label> Reason:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Why is this goal importantr to you"
                  name="newWhy"
                  value={newReason}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
      
          <div>
            <div>
            </div>
            <div>
              <Button onClick={handleCancel}>
                <div>
                  Cancel
                </div>
              </Button>
              <Button type="submit">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

GoalsEdit.propTypes = {
  name: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setGoalData: PropTypes.string.isRequired,
  setGoalState: PropTypes.string.isRequired,
}


export default GoalsEdit
