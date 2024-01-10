import requests from "../request";

import getBoardssList from "../boards/list";

const getTasksList = async (workspaceId) => {
  const tasksUrl = `workspaces/${workspaceId}/tasks`;
  const tasksList = await requests.get(tasksUrl);
  const boards = await getBoardssList();

  const tasks = {};
  const columns = {};
  const columnOrder = [];

  boards.forEach((board) => {
    columns[board.id] = { id: board.id, title: board.name, taskIds: [] };
    columnOrder.push(board.id);
  });

  tasksList.data.forEach((task) => {
    tasks[task.id] = task;
    columns[task.status.id].taskIds.push(task.id);
  });

  const tmp = { tasks, columns, columnOrder };
  return tmp;
};

export default getTasksList;
