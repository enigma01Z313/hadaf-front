import { createContext, useState } from "react";

const workspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
  const [theWorkspace, setTheWorkspace] = useState();

  return (
    <workspaceContext.Provider
      value={{
        theWorkspace,
        setTheWorkspace,
      }}>
      {children}
    </workspaceContext.Provider>
  );
};

export default workspaceContext;
