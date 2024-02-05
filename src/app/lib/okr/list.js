import requests from "../request";

const getOkrsList = async (workspaceId) => {
    console.log('1-2--------------------');
  const okrs = await requests.get(`workspaces/${workspaceId}/okrs`);

  return okrs;
};

export default getOkrsList;
