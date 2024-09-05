import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const TasksArea = ( {id} ) => {
    const [tasksData, setTasksData] = useState([]);
    const [activeTasks, setActiveTasks] = useSate([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [hasLoaded, setHasLoaded] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axiosReq.get(`/tasks/`);
                const unassignedTasks = data.results.filter(task => !task.goals);
                setTasksData(unassignedTasks);
                setActiveTasks(unassignedTasks.filter(task => !task.completed));
                setCompletedTasks(unassignedTasks.filter(task => task.completed));
                setHasLoaded(true);
            } catch (err) {
                console.log("Failed to fetch tasks", err);
            }
        };

        fetchTasks();
    }, [navigate, id]);

    


  return (
    <div>TasksArea</div>
  )
}

export default TasksArea