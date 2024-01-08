import requests from "../request";

const deleteTask = async (taskId) => {
  await requests.remove(`tasks/${taskId}`);

  return { status: "Success" };
};

export default deleteTask;
