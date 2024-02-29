import requests from "../../request";

const getOkrComments = async (okrId) => {
  const comments = await requests.get(`okrs/${okrId}/comments`);

  return comments;
};

export default getOkrComments;
