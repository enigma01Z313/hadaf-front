import requests from "../request";

const getDashboardData = async ({
  workspaceId,
  target,
  activeTimeframe,
  year,
  targetMember,
}) => {
  let queryParams = "";
  let queryCount = 0;

  if (activeTimeframe) {
    queryParams += `${queryCount === 0 ? "?" : "&"}`;
    queryParams += `timeFrameId=${activeTimeframe}`;
    queryCount++;
  }

  if (year) {
    queryParams += `${queryCount === 0 ? "?" : "&"}`;
    queryParams += `year=${year}`;
    queryCount++;
  }

  if (targetMember && targetMember !== "all") {
    queryParams += `${queryCount === 0 ? "?" : "&"}`;
    queryParams += `userId=${targetMember}`;
    queryCount++;
  }

  const url = `/workspaces/${workspaceId}/dashboard/${target}${queryParams}`;
  console.log(url);

  const data = await requests.get(url);

  return data;
};

export default getDashboardData;
