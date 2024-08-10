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
        {}
    </div>
  )
}
