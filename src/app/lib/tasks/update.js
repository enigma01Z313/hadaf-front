import requests from "../request";

const updateTask = async (taskId, data) => {
  const task = await requests.put(`tasks/${taskId}`, data);

  return task;
};

export default updateTask;
