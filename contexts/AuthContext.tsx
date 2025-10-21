import { User } from '@supabase/supabase-js';
import { createContext, SetStateAction, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  setAuth: (authUser: SetStateAction<User | null>) => void;
  setUserData: (userData: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setAuth: () => {},
  setUserData: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (authUser: SetStateAction<User | null>) => {
    setUser(authUser);
  };

  const setUserData = (userData: User | null) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
