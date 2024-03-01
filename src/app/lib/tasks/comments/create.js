import requests from "../../request";

const createTaskComment = async (taskId, newComment) => {
  const comments = await requests.post(`tasks/${taskId}/comments`, newComment);

  return comments;
};

export default createTaskComment;
