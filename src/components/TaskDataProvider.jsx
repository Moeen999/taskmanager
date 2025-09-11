import { useEffect, useState } from "react";
import { getPostsData, createTask, deleteTask } from "../api/postsData";
import { Header } from "./Header";
import { TaskList } from "./TaskList";
export const DataProvider = () => {
  const [tasks, setTasks] = useState([]);

  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleDeleteSelected = async (selectedTasks) => {
    try {
      for (let id of selectedTasks) {
        await deleteTask(id);
      }
      setTasks((prev) =>
        prev.filter((task) => !selectedTasks.includes(task.id))
      );
    } catch (error) {
      console.error("Deletion Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostsData();
      setTasks(data);
    };
    fetchData();
  }, []);
  const addTask = async (newTask) => {
    try {
      const data = await createTask(newTask);
      if (data) {
        setTasks((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Add task error:", error);
    }
  };

  return (
    <>
      <Header
        onSave={addTask}
        onDelete={() => handleDeleteSelected(selectedTasks)}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
      />
    </>
  );
};
