import requests from "../request";

const listTaskStatuses = async () => {
  const url = `taskStatuses`;
  const items = await requests.get(url);

  return items;
};

export default listTaskStatuses;
