import requests from "../../request";

const getOkrTasksList = async (workspaceId, okrId) => {
  let tasksUrl = `workspaces/${workspaceId}/tasks?okrId=${okrId}`;
    
  const tasksList = await requests.get(tasksUrl);

  return tasksList;
};

export default getOkrTasksList;
