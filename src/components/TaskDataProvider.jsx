import { useEffect, useState } from "react";
import { getPostsData, createTask, deleteTask } from "../api/postsData";
import { Header } from "./Header";
import { TaskList } from "./TaskList";
import { Loader } from "./Loader";
export const DataProvider = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const handleDeleteSelected = async (selectedTasks) => {
    try {
      await Promise.all(selectedTasks.map((id) => deleteTask(id)));
      setTasks((prev) =>
        prev.filter((task) => !selectedTasks.includes(task.id)),
      );
    } catch (error) {
      console.error("Deletion Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      const data = await getPostsData();
      setisLoading(false);
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
      {isLoading ? (
        <Loader />
      ) : (
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
        />
      )}
    </>
  );
};
