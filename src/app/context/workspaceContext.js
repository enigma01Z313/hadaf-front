import { createContext, useState } from "react";

const workspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
  const [theWorkspace, setTheWorkspace] = useState([]);
  const [theUsers, setTheUsers] = useState({ data: [], total: 0 });
  const [theMerits, setTheMerits] = useState({ data: [], total: 0 });
  const [theWorkspaceTimeframes, setTheWorkspaceTimeframes] = useState([]);
  const [theWorkspaceOkrs, setTheWorkspaceOkrs] = useState([]);

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
        theMerits,
        setTheMerits,
        userWorkspaces,
        setUserWorkspaces,
        theWorkspaceTimeframes,
        setTheWorkspaceTimeframes,
        theWorkspaceOkrs,
        setTheWorkspaceOkrs,
      }}>
      {children}
    </workspaceContext.Provider>
  );
};

export default workspaceContext;
