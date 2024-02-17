import requests from "../request";

const deleteMerit = async (workspaceId, tagId) => {
  const url = `/workspaces/${workspaceId}/merits/${tagId}`;

  await requests.remove(url);
};

export default deleteMerit;
