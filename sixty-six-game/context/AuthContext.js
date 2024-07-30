import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
  const isAuthenticated = username !== 'Guest';

  return (
    <AuthContext.Provider value={{ username, setUsername, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
