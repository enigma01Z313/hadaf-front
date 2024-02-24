import requests from "../request";

const getNotifications = async (workspaceId) => {
  const items = await requests.get(`workspaces/${workspaceId}/notifications`);

  return items;
};

export default getNotifications;
