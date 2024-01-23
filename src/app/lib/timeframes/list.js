import requests from "../request";

const listTimeframes = async (workspaceId, all = false) => {
  const timeFrames = [];
  const data = await requests.get(
    `workspaces/${workspaceId}/timeFrames?all=${all}`
  );

  data.data.forEach((item) => {
    const itemStatus = item.status;
    const targetStatus = timeFrames.find((v) => v.code === itemStatus.code);

    if (!targetStatus) timeFrames.push({ ...itemStatus, items: [] });

    const targetStatusIndex = timeFrames.findIndex(
      (v) => v.code === itemStatus.code
    );
    timeFrames[targetStatusIndex].items.push(item);
  });

  const alphSorted = timeFrames.sort((a, b) => a.label < b.label ? 1 : -1)

  return alphSorted;
};

export default listTimeframes;
