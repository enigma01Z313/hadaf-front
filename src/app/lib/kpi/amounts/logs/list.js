import requests from "../../../request";

const getAmountLogs = async (okrId) => {
  const logs = await requests.get(`logs/amounts/${okrId}`);

  return logs;
};

export default getAmountLogs;
