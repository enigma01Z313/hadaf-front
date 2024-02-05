import requests from "../request";

const deleteOkr = async (workspaceId, okrId) => {
  const url = `/workspaces/${workspaceId}/okrs/${okrId}`;

  await requests.remove(url);
};

export default deleteOkr;
