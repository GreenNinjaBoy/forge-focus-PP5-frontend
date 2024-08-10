import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";


export const GoalsArea = ( {id} ) => {

    const [goalsData, setGoalsData] = useState({
        name:"",
        reason:"",
        image:"",
    });

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(()  => {
        const fetchGoals = async () => {
            try {
                const { data } = await axiosReq.get(`/goals`);
                const { name, reason, image } = data;
                setGoalsData({ name, reason, image });
                setHasLoaded(true);
            } catch (error) {
                console.log("failed to fetch user goals", error);
            }
        };

        fetchGoals();
    }, [id])


  return (
    <div>
        {hasLoaded ? (
            Array.isArray(goalsData) ? (
                goalsData.map((goal) => (
                    <div key={goal.id}>
                        <h1>{goal.name}</h1>
                        <p>{goal.reason}</p>
                        <img src={goal.image} alt={goal.name}/>
                    </div> 
                ))
            ) : (
                <p>No Goals data Available</p>
            )
        ) : (
            <p>Loading Goals Data....</p>
        )}
    </div>
  );
}

export default GoalsArea