import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";

const TasksArea = ( {id} ) => {
    const [tasksData, setTasksData] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
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

    useEffect(() => {
        const results = tasksData.filter(task =>
            task.task_title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setActiveTasks(results.filter(task => !task.completed));
        setCompletedTasks(results.filter(task => task.completed));
    }, [searchTerm, tasksData]);

    const handleCompleteTask = (taskId) => {
        const updatedTasks = activeTasks.map( task =>
            task.id === taskId ? { ...task, completed: true } : task
        );
        setActiveTasks(updatedTasks.filter(task => !task.completed));
        setCompletedTasks([...completedTasks, ...updatedTasks.filter(task => task.completed)]);
    };

    const handleResetTask = (taskId) => {
        const updatedTasks = completedTasks.map(task =>
            task.id === taskId ? { ...task, completed: false} : task
        );
        setCompletedTasks(updatedTasks.filter(task => task.completed));
        setActiveTasks([...activeTasks, ...updatedTasks.filter(task => !task.completed)]);
    };

    const handleDeleteTask = (taskId) => {
        setActiveTasks(activeTasks.filter(task => task.id !== taskId));
        setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
    };


    return (
        <div>
            <div >
                <input
                    type="text"
                    placeholder="serach tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    
                    />
            </div>
            <div>
                {hasLoaded ? (
                    <>
                    <div>
                        <h2>Active Tasks</h2>
                        {activeTasks.length > 0 ? (
                            activeTasks.map(task => (
                                <div key={task.id}>
                                    <p>{task.task_title}</p>
                                    <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                            <button onClick={() => navigate(`/tasksedit/${task.id}`)}>Edit</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No active tasks.</p>
                                )}
                            </div>
                            <div>
                                <h2>Completed Tasks</h2>
                                {completedTasks.length > 0 ? (
                                    completedTasks.map(task => (
                                        <div key={task.id}>
                                            <p>{task.task_title}</p>
                                            <button onClick={() => handleResetTask(task.id)}>Reset</button>
                                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No completed tasks.</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Loading Tasks Data....</p>
                    )}
                </div>
            </div>
        );
    };

    TasksArea.propTypes = {
        id: PropTypes.number, 
    };

export default TasksArea;