import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TaskList.css";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskListUpdated: () => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskListUpdated }) => {
  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      onTaskListUpdated();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task. Please try again.");
    }
  };

  const handleEditTask = async (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);

    const newTitle = prompt(
      "Enter the new task title:",
      taskToEdit?.title || ""
    );
    if (newTitle === null) {
      return; 
    }

    const newDescription = prompt(
      "Enter the new task description:",
      taskToEdit?.description || ""
    );
    if (newDescription === null) {
      return; 
    }

    const newCompletedString = prompt(
      "Is the task completed? (yes/no):",
      taskToEdit?.completed ? "yes" : "no"
    );
    if (newCompletedString === null) {
      return; 
    }
    const newCompleted = newCompletedString.toLowerCase() === "yes";

    try {
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        title: newTitle,
        description: newDescription,
        completed: newCompleted,
      });

      onTaskListUpdated();
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task. Please try again.");
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              {!task.completed && (
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
              )}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
