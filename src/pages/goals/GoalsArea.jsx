import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const GoalsArea = ({ id }) => {
    const [goalsData, setGoalsData] = useState({
        name: "",
        reason: "",
        image: "",
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get(`/goals/`);
                console.log("Fetched data successfully:", data); // Debugging line
                if (data.results && data.results.length > 0) {
                    const { name, reason, image } = data.results[0];
                    setGoalsData({ name, reason, image });
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
                <div>
                    <h1>{goalsData.name}</h1>
                    <p>{goalsData.reason}</p>
                    <img src={goalsData.image} alt={goalsData.name} />
                </div>
            ) : (
                <p>Loading Goals Data....</p>
            )}
        </div>
    );
};

export default GoalsArea;