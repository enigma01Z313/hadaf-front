import requests from "../request";

const createTask = async ({ newTaskTitle, createMode }) => {
  const newTask = await requests.post("tasks", {
    title: newTaskTitle,
    status: createMode,
  });

  return newTask
};

export default createTask;
