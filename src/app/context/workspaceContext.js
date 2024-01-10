import { createContext, useState } from "react";

const workspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
  const [theWorkspace, setTheWorkspace] = useState([]);
  const [theUsers, setTheUsers] = useState({ data: [], total: 0 });

  const [theUser, setTheUser] = useState();
  const [userWorkspaces, setUserWorkspaces] = useState([]);

  return (
    <workspaceContext.Provider
      value={{
        theWorkspace,
        setTheWorkspace,
        theUsers,
        setTheUsers,
        theUser,
        setTheUser,
        userWorkspaces,
        setUserWorkspaces,
      }}>
      {children}
    </workspaceContext.Provider>
  );
};

export default workspaceContext;
