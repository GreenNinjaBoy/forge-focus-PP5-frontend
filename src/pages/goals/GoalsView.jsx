const GoalsView = (props) => {
    const {
        name,
        reason,
        image,
        setGoalState
    } = props;

    const handleEdit = () => {
        setGoalState('edit');
    }

    const handleDelete = ()  => {
        setGoalState('delete');
    }

    return (
        <div>
            <img src={image} alt='goal'/>
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
    )
}

export default GoalsView