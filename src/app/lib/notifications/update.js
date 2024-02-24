import requests from "../request";

const updateNotification = async (workspaceId, notifId, data) => {
  const url = `workspaces/${workspaceId}/notifications/${notifId}`;

  const uppedData = await requests.put(url, data);

  return uppedData;
};

export default updateNotification;
