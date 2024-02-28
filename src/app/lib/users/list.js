import requests from "../request";
import permissionChec from "@/app/utils/permissionCheck";

const getUsersList = async (workspaceId, allUsers) => {
  const isSuperAdmin = permissionChec("SUPER_USER");
  const isAdmin = permissionChec("ADMIN");
  const isStandard = permissionChec("STANDARD");

  let usersGetUrl;
  if (isSuperAdmin || isAdmin) {
    if (allUsers) usersGetUrl = "users";
    else usersGetUrl = `workspaces/${workspaceId}/users`;
  } else usersGetUrl = `workspaces/${workspaceId}/users`;

  if (isStandard && !workspaceId) return [];

  const users = await requests.get(usersGetUrl);

  return users;
};

export default getUsersList;
