import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const GoalsArea = ({ id }) => {
    const [goalsData, setGoalsData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get(`/goals/`);
                console.log("Fetched data successfully:", data); // Debugging line
                if (data.results && data.results.length > 0) {
                    setGoalsData(data.results);
                }
                setHasLoaded(true);
            } catch (error) {
                console.error("Failed to fetch goals", error);
                // Handle the error appropriately
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