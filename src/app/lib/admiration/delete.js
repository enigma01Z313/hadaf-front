import requests from "../request";

const deleteAdmiration = async (workspaceId, id) => {
  const url = `/workspaces/${workspaceId}/admirations/${id}`;

  await requests.remove(url);
};

export default deleteAdmiration;
