import getTheUser from "./getTheUser";

const permissionChec = (targetPermissions) => {
  const theUser = getTheUser();
  const permissions = theUser.role.permissions;

  if (!targetPermissions || targetPermissions === "") return true;
  if (typeof targetPermissions === "string")
    return permissions.includes(targetPermissions);

  if (Array.isArray(targetPermissions))
    return targetPermissions.every((tp) => permissions.includes(tp));

  if (typeof targetPermissions === "object") {
    if (targetPermissions.relation === "AND")
      targetPermissions.items.targetPermissions.every((tp) =>
        permissions.includes(tp)
      );
    else if (targetPermissions.relation === "OR")
      targetPermissions.items.targetPermissions.some((tp) =>
        permissions.includes(tp)
      );
  }
  
  return false;
};

export default permissionChec;
