import requests from "../request";

const createTask = async ({ newTaskTitle, statusId }) => {
  const newTask = await requests.post("tasks", {
    title: newTaskTitle,
    status: statusId,
  });

  return newTask
};

export default createTask;
