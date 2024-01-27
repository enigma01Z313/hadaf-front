import requests from "../request";

const listTimeframes = async (params) => {
  const all = params?.all ?? false;
  const raw = params?.raw ?? false;
  const workspaceId = params?.workspaceId ?? "";

  const timeFrames = [];
  const data = await requests.get(
    `workspaces/${workspaceId}/timeFrames?all=${all}`
  );

  if (raw) return data.data;

  data.data.forEach((item) => {
    const itemStatus = item.status;
    const targetStatus = timeFrames.find((v) => v.code === itemStatus.code);

    if (!targetStatus) timeFrames.push({ ...itemStatus, items: [] });

    const targetStatusIndex = timeFrames.findIndex(
      (v) => v.code === itemStatus.code
    );
    timeFrames[targetStatusIndex].items.push(item);
  });

  const alphSorted = timeFrames.sort((a, b) => (a.label < b.label ? 1 : -1));

  return alphSorted;
};

export default listTimeframes;
