import { createContext, useState } from "react";

const workspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
  const [theWorkspace, setTheWorkspace] = useState();
  const [theUsers, setTheUsers] = useState({ data: [], total: 0 });
  const [theTeams, setTheTeams] = useState({ data: [], total: 0 });
  const [theMerits, setTheMerits] = useState({ data: [], total: 0 });
  const [theWorkspaceTimeframes, setTheWorkspaceTimeframes] = useState([]);
  const [theWorkspaceOkrs, setTheWorkspaceOkrs] = useState([]);
  const [theNotifications, setTheNotifications] = useState({
    time: new Date(),
    data: [],
  });

  const [theUser, setTheUser] = useState();
  const [userWorkspaces, setUserWorkspaces] = useState([]);

  return (
    <workspaceContext.Provider
      value={{
        theWorkspace,
        setTheWorkspace,
        theUsers,
        setTheUsers,
        theTeams,
        setTheTeams,
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
        theNotifications,
        setTheNotifications,
      }}>
      {children}
    </workspaceContext.Provider>
  );
};

export default workspaceContext;
