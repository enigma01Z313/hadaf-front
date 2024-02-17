import requests from "../request";

const listMerits = async ({ workspaceId }) => {
  const url = `workspaces/${workspaceId}/merits`;
  const items = await requests.get(url);

  return items;
};

export default listMerits;
