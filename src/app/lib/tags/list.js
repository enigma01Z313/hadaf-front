import requests from "../request";

const listTags = async ({ workspaceId }) => {
  const url = `workspaces/${workspaceId}/tags`;
  const items = await requests.get(url);

  return items;
};

export default listTags;
