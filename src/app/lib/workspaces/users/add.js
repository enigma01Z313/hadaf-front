import requests from "../../request";

const addUserToWorkspace = async ({ workspaceId, email }) => {
  const user = await requests.post(`workspaces/${workspaceId}/user`, {
    email,
  });

  return user;
};

export default addUserToWorkspace;
