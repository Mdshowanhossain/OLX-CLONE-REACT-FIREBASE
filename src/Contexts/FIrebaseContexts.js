// Method 1
import React, { createContext, useState } from "react";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

// Method 2 Component method
export default function Context({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
