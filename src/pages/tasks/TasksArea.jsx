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


  return (
    <div>TasksArea</div>
  )
}

export default TasksArea