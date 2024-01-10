import { createContext, useState } from "react";

const workspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
  const [theWorkspace, setTheWorkspace] = useState([]);
  const [theUsers, setTheUsers] = useState({data: [], total: 0});

  return (
    <workspaceContext.Provider
      value={{
        theWorkspace,
        setTheWorkspace,
        theUsers,
        setTheUsers,
      }}>
      {children}
    </workspaceContext.Provider>
  );
};

export default workspaceContext;
