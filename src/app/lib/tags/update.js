import requests from "../request";

const updateTag = async (workspaceId, tagId, data) => {
  const url = `workspaces/${workspaceId}/tags/${tagId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateTag;
