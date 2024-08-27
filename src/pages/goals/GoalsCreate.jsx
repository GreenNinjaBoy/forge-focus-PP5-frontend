import { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';

const GoalsCreate = () => {
  const defaultImage = 'path/to/default/image.jpg';
  const [goalData, setGoalData] = useState({
    name: '',
    reason: '',
    image: null
  });

  const { name, reason, image } = goalData;
  const imageInput = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    setGoalData({
      ...goalData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('reason', reason);
    if (imageInput.current.files.length > 0) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.post('/goals/', formData);
      navigate(`/goals/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error(err.response?.data);
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Create a New Goal</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter goal name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="reason">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              type="text"
              placeholder="Why is this goal important to you?"
              name="reason"
              value={reason}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              ref={imageInput}
              onChange={handleChangeImage}
            />
          </Form.Group>
          <div>
            <img
              src={image ? URL.createObjectURL(image) : defaultImage}
              alt="Goal"
              style={{ width: '100px', height: '100px' }}
            />
          </div>
          <div>
            <Button variant="secondary">
              <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
                Cancel
              </Link>
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GoalsCreate;