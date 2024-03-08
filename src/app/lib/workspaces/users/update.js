import requests from "../../request";

const updateUser = async (workspaceId, userId, body) => {
  const res = await requests.put(
    `workspaces/${workspaceId}/users/${userId}`,
    body
  );

  return res;
};

export default updateUser;
