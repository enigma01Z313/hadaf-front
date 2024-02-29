import requests from "../../request";

const getOkrLogs = async (okrId) => {
  const logs = await requests.get(`logs/okrs/${okrId}`);

  return logs;
};

export default getOkrLogs;
