import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskListUpdated = async () => {
    try {
      const response = await axios.get<Task[]>(
        "http://localhost:8000/api/tasks"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks. Please try again.");
    }
  };

  useEffect(() => {
    handleTaskListUpdated();
  }, []);

  return (
    <div className="app-container">
      <TaskForm
        onTaskAdded={handleTaskAdded}
        onTaskListUpdated={handleTaskListUpdated}
      />
      <TaskList tasks={tasks} onTaskListUpdated={handleTaskListUpdated} />
      <ToastContainer />
    </div>
  );
};

export default App;
