import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalsArea from "./GoalsArea";


const GoalsDesktop = ({id}) => {
    const [keyParameters,] = useState({
        goals_id: id,
    })
    
    const { goals_id } = keyParameters;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <button aria-label="Click to return to previous page" onClick={handleBack}>
                Return
            </button>

        <GoalsArea id={goals_id} />

        <div>
            <p>Tasks will go here</p>
        </div>
    </div>
    );
};

GoalsDesktop.propTypes  = {
    id: PropTypes.number.isRequired,
}

export default GoalsDesktop