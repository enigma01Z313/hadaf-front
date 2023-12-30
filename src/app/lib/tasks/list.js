import requests from "../request"

import getBoardssList from "../boards/list"

const getTasksList = async(workspaceId) => {
    const tasksUrl = `tasks`
    const tasks = await requests.get(tasksUrl)
    const boards = await getBoardssList()

    const tmp = {};
    boards.forEach(
      (board) =>
        (tmp[board.id] = { id: board.id, name: board.name, items: [] })
    );

    tasks.forEach((task) => {
      const statusId = task.status.id;
      tmp[statusId].items.push(task);
    });

    return tmp
}

export default getTasksList
