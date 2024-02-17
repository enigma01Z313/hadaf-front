import requests from "../request";

const deleteTag = async (workspaceId, tagId) => {
  const url = `/workspaces/${workspaceId}/tags/${tagId}`;

  await requests.remove(url);
};

export default deleteTag;
