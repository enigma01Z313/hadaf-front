import { createContext, useState } from "react";

const CreateModeContext = createContext();

export const CreateModeProvider = ({ children }) => {
  const [createMode, setCreateMode] = useState(false);

  return (
    <CreateModeContext.Provider value={{ createMode, setCreateMode }}>
      {children}
    </CreateModeContext.Provider>
  );
};

export default CreateModeContext;
