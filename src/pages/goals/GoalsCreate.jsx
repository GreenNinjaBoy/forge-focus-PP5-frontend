import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../hooks/useGlobalSuccess';
import styles from '../../styles/GoalsAndTasks.module.css';

const GoalsCreate = () => {
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

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
    if (event.target.files.length) {
      setGoalData({
        ...goalData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
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
      console.log(data);
      setGlobalSuccessMessage("You have created a new goal!")
      setShowGlobalSuccess(true);
      navigate(`/goalsarea`);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create a New Goal</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input
            id="name"
            className={styles.formControl}
            type="text"
            placeholder="Enter goal name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="reason" className={styles.formLabel}>Reason</label>
          <textarea
            id="reason"
            className={styles.formControl}
            placeholder="Why is this goal important to you?"
            name="reason"
            value={reason}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.formLabel}>Image</label>
          <input
            id="image"
            className={styles.formControl}
            type="file"
            name="image"
            ref={imageInput}
            onChange={handleChangeImage}
          />
        </div>
        <div>
          <img
            src={image || defaultImage}
            alt="Goal"
            className={styles.imagePreview}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button 
            type="button" 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate('/home')}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className={`${styles.button} ${styles.primaryButton}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalsCreate;