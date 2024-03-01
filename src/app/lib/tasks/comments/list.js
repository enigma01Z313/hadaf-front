import requests from "../../request";

const getTaskComments = async (taskId) => {
  const comments = await requests.get(`tasks/${taskId}/comments`);

  return comments;
};

export default getTaskComments;
