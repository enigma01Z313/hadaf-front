import requests from "../request";

const getBoardssList = async () => {
  const boards = await requests.get(`taskStatuses`);

  return boards;
};

export default getBoardssList;
