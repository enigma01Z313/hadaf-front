import requests from "../../request";

const updateTaskComment = async (taskId, commentId, newCommentData) => {
  const comments = await requests.put(
    `tasks/${taskId}/comments/${commentId}`,
    newCommentData
  );

  return comments;
};

export default updateTaskComment;
