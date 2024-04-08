import requests from "../request";

const getTrainees = async () => {
  const trainees = await requests.get('trainees');

  return trainees;
};

export default getTrainees;
