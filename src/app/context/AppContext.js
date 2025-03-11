import { createContext, useContext, useState } from "react";

// Create Context
const AppContext = createContext();

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null); // Store JSON data

  return (
    <AppContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context easily
export const useAppContext = () => useContext(AppContext);
