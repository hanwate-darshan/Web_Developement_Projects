import React, { createContext } from "react";
import { useState } from "react";
export const AuthDataContext = createContext();

const AuthContext = ({children}) => {
  let serverUrl = "http://localhost:3000";
  
  const [loading, setLoading] = useState(false)

 let value = {
    serverUrl,loading,setLoading
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
