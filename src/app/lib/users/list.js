import requests from "../request";
import permissionChec from "@/app/utils/permissionCheck";

const getUsersList = async () => {
  const hasPermission = permissionChec("SUPER_USER");

  console.log("2------------------------------------");
  console.log(hasPermission);

  const usersGetUrl =
    (permissionChec("SUPER_USER") && "users")
    // || (permissionChec("STANDARD") && `users/${workspace.id}`);

  const users = await requests.get("users");

  return users;
};

export default getUsersList;
