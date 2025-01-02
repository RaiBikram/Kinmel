import { createContext, useContext, useState } from "react";

const searchContext = createContext();

// constext provider

export const SearchContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keywords: "",
    results: [],
  });
  return (
    <searchContext.Provider value={[auth, setAuth]}>
      {children}
    </searchContext.Provider>
  );
};

// usecontext
export const useSearch = () => useContext(searchContext);
