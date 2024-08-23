import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import GoalsEdit from "./GoalsEdit";
import GoalsDelete from "./GoalsDelete";
import { useNavigate } from "react-router-dom";

const GoalsArea = ({ id }) => {

    const [goalsData, setGoalsData] = useState([]);

    const [hasLoaded, setHasLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get(`/goals/`);
                console.log("Fetched data successfully:", data); // Debugging line
                if (data.results && data.results.length > 0) {
                    setGoalsData(data.results);
                }
                setHasLoaded(true);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate('/signin');
                } else if (err.response?. status === 403) {
                    navigate('/home');
                } else if (err.response?.status == 404) {
                    navigate('/home');
                }
                console.log("Failed to fetch goals", err);
            }
        };

        fetchGoals();
    }, [id]);

    return (
        <div>
            {hasLoaded ? (
                goalsData.map((goal) => (
                    <div key={goal.id}>
                        <h1>{goal.name}</h1>
                        <p>{goal.reason}</p>
                        <img src={goal.image} alt={goal.name} />
                    </div>
                ))
            ) : (
                <p>Loading Goals Data....</p>
            )}
        </div>
    );
};

export default GoalsArea;