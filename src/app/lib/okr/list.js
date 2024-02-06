import requests from "../request";

const getOkrsList = async (workspaceId) => {
  const okrs = await requests.get(`workspaces/${workspaceId}/okrs`);

  return okrs;
};

export default getOkrsList;
