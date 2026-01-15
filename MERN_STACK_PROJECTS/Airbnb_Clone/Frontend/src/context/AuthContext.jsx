import React, { createContext } from "react";
export const AuthDataContext = createContext();

const AuthContext = ({children}) => {
  let serverUrl = "http://localhost:3000";

 let value = {
    serverUrl
  };
  return (
    <div>
      <AuthDataContext.Provider value={value}>
        {children}
        </AuthDataContext.Provider>
    </div>
  );
};

export default AuthContext;
