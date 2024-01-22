import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TaskForm.css";

interface TaskFormProps {
  onTaskAdded: (newTask: Task) => void;
  onTaskListUpdated: () => void;
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onTaskAdded,
  onTaskListUpdated,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleAddTask = async () => {
    try {
      const response = await axios.post<Task>(
        "http://localhost:8000/api/tasks",
        {
          title: taskTitle,
          description: taskDescription,
          completed: false,
        }
      );

      const newTask: Task = response.data;
      onTaskAdded(newTask);
      setTaskTitle("");
      setTaskDescription("");
      onTaskListUpdated();
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
