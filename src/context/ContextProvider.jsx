import { createContext, useContext, useState } from 'react';

// Create context
const AppContext = createContext();

// Provider component
export const ContextProvider = ({ children }) => {
  const [uniqId, setUniqId] = useState('');
  const API_BASE_URL = 'http://localhost/lmg/younion/landingPage/api/'; // optional global API base URL

  return (
    <AppContext.Provider value={{ uniqId, setUniqId, API_BASE_URL }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context anywhere
export const useAppContext = () => useContext(AppContext);
