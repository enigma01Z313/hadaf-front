import requests from "../request";
import permissionChec from "@/app/utils/permissionCheck";

const getUsersList = async (workspaceId) => {
  const isSuperAdmin = permissionChec("SUPER_USER");
  const isStandard = permissionChec("STANDARD");

  const usersGetUrl =
    (isSuperAdmin && "users") ||
    (isStandard && `workspaces/${workspaceId}/users`);

  if (isStandard && !workspaceId) return [];

  const users = await requests.get(usersGetUrl);

  return users;
};

export default getUsersList;
