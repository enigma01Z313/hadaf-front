import requests from "../../request";

const removeOkrComment = async (okrId, commentId) => {
  const comments = await requests.remove(`okrs/${okrId}/comments/${commentId}`);

  return comments;
};

export default removeOkrComment;
