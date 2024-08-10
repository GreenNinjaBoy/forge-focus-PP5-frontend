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
    
}