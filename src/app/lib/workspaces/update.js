import requests from "../request";

const updateWorkspace = async (id, body) => {
  const res = await requests.put(`workspaces/${id}`, body);

  return res;
};

export default updateWorkspace;
