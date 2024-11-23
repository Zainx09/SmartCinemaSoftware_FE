// src/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook to access the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to wrap around components that need access to user
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({"email":"zain@gmail.com","id":"671851c4fcc86bd7fdca568f","phone":"03132525514","username":"zain"});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
