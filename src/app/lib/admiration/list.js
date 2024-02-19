import requests from "../request";
import permissionChec from "@/app/utils/permissionCheck";

const getAdmirationsList = async (workspaceId, cat) => {
  const isSuperAdmin = permissionChec("SUPER_USER");
  const isAdmin = permissionChec("ADMIN");
  const isStandard = permissionChec("STANDARD");

  // const admirationsGetUrl =
  //   ((isSuperAdmin || isAdmin) && `workspaces/${workspaceId}/admirations`) ||
  //   (isStandard && `workspaces/${workspaceId}/admirations/${cat}`);

    const admirationsGetUrl = `workspaces/${workspaceId}/admirations/${cat}`;

  if (isStandard && !workspaceId) return [];

  const admirations = await requests.get(admirationsGetUrl);

  return admirations;
};

export default getAdmirationsList;
