import requests from "../request";

const addKRToOkr = async (okrId, data) => {
  const url = `okrs/${okrId}/keyResults`;

  const uppedKR = await requests.post(url, data);

  return uppedKR;
};

export default addKRToOkr;
