import requests from "../request";

const removeKRFromOkr = async (okrId, krId) => {
  const url = `okrs/${okrId}/keyResults/${krId}`;

  const uppedKR = await requests.remove(url);

  return uppedKR;
};

export default removeKRFromOkr;
