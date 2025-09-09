
import { useEffect, useState } from "react";
import { getPostsData, createTask } from "../api/postsData";
import { Header } from "./Header";
import {TaskList} from "./TaskList"
export const DataProvider = () => {
  const [tasks, setTasks] = useState([]);

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
      setTasks((prev) => [...prev, data]);
    } catch (error) {
        console.error("Add task error:", error);
    }
  };

  
   return (
    <>
      <Header onSave={addTask} />
      <TaskList  tasks={tasks} />
    </>
  );
};
