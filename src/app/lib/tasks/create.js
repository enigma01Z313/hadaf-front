import requests from "../request";

const createTask = async ({
  newTaskTitle,
  statusId,
  theWorkspace: workspaceId,
  order
}) => {
  const tasksUrl = `workspaces/${workspaceId}/tasks`;
  const newTask = await requests.post(tasksUrl, {
    title: newTaskTitle,
    status: statusId,
    order
  });

  return newTask;
};

export default createTask;
