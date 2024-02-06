import requests from "../request";

const updateKR = async (okrId, krId, data) => {
  const url = `okrs/${okrId}/keyResults/${krId}`;

  const uppedKR = await requests.put(url, {...data, owner: data.owner.id});

  return uppedKR;
};

export default updateKR;
