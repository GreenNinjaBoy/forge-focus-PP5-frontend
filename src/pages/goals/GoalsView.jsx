import PropTypes from "prop-types";

const GoalsView = (props) => {
    const {
        id,
        name,
        reason,
        image,
        setGoalState,
        setGoalId
    } = props;

    const handleEdit = () => {
        setGoalId(id);
        setGoalState('edit');
    }

    const handleDelete = () => {
        setGoalState('delete');
    }

    return (
        <div>
            <img src={image} alt='goal' />
            <h2>{name}</h2>
            <p>{reason}</p>
            <div>
                <button onClick={handleEdit}>
                    Edit Goal
                </button>
                <button onClick={handleDelete}>
                    Delete Goal
                </button>
            </div>
        </div>
    );
};

GoalsView.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    setGoalState: PropTypes.func.isRequired,
    setGoalId: PropTypes.func.isRequired,
}

export default GoalsView;