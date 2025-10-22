import { CustomUser } from '@/types/user';
import { createContext, SetStateAction, useContext, useState } from 'react';

interface AuthContextType {
  user: CustomUser | null;
  setAuth: (authUser: SetStateAction<CustomUser | null>) => void;
  setUserData: (userData: CustomUser | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setAuth: () => {},
  setUserData: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);

  const setAuth = (authUser: SetStateAction<CustomUser | null>) => {
    setUser(authUser);
  };

  const setUserData = (userData: CustomUser | null) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
