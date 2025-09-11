import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
export const getPostsData = async () => {
  try {
    const { data } = await api.get("/tasks");
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createTask = async (task) => {
  try {
    const { data, status } = await api.post("/tasks", task);

    if (status === 201) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Post error:", error);
  }
};

export const updateTask = async (id, priorityData) => {
  try {
    const { data, status } = await api.patch(`/tasks/${id}`, priorityData);
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error("Update error:", error);
  }
};

export const deleteTask = async (id) => {
  try {
     await api.delete(`/tasks/${id}`);
  } catch (error) {
    console.log("Error deleting Task ", error);
  }
};
