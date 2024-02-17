import requests from "../request";

const updateMerit = async (workspaceId, tagId, data) => {
  const url = `workspaces/${workspaceId}/merits/${tagId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateMerit;
