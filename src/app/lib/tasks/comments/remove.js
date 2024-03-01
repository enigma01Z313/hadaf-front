import requests from "../../request";

const removeTaskComment = async (taskId, commentId) => {
  const comments = await requests.remove(`tasks/${taskId}/comments/${commentId}`);

  return comments;
};

export default removeTaskComment;
