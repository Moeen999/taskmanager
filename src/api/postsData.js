import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" }
});

//! test get req

export const getPostsData =async () => {
  try {
    const {data} = await api.get("/tasks");
  return data;  
  } catch (error) {
    console.log(error);
  }
};


//! post data Modal ka data yahan ayga 
export const createTask = async (task) => {
  try {
    const { data } = await api.post("/tasks", task);
    return data; // json-server returns the saved task with id
  } catch (error) {
    console.error("Post error:", error);
  }
};
