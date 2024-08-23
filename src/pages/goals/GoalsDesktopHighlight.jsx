// import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// import { axiosReq } from "../../api/axiosDefaults";
// import { Spinner } from "react-bootstrap";


const GoalsDesktopHighlight = (props) => {
    const {
        name,
        reason,
        image,
        id,
    } = props;


    return (
        <div>
            <div>
                <img src={image} alt={`${name} goal`} />
                <div>
                    <h2>{name}</h2>
                    <p>{reason}</p>
                </div>
            </div>
            <div>            
            <p>Tasks will go here once created</p>
            </div>
            <div>
                <Link to={`/goals/${id}`}>
                Click to view Goal
                </Link>
            </div>
        </div>
    );
};

GoalsDesktopHighlight.propTypes = {
    name: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default GoalsDesktopHighlight