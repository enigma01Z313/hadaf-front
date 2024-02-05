import requests from "../request";

const updateOkr = async (workspaceId, okrId, data) => {
  const url = `workspaces/${workspaceId}/okrs/${okrId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateOkr;
