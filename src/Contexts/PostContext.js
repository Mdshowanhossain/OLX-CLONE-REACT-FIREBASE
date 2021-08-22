import React, { createContext, useState } from "react";
export const ViewPostContext = createContext(null);

export default function Context({ children }) {
  const [viewPost, setViewPost] = useState(null);

  return (
    <ViewPostContext.Provider value={{ viewPost, setViewPost }}>
      {children}
    </ViewPostContext.Provider>
  );
}
