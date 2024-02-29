import requests from "../../request";

const updateOkrComment = async (okrId, commentId, newCommentData) => {
  const comments = await requests.put(
    `okrs/${okrId}/comments/${commentId}`,
    newCommentData
  );

  return comments;
};

export default updateOkrComment;
