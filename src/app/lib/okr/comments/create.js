import requests from "../../request";

const createOkrComment = async (okrId, newComment) => {
  const comments = await requests.post(`okrs/${okrId}/comments`, newComment);

  return comments;
};

export default createOkrComment;
