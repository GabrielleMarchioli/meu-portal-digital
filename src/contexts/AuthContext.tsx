import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { student } from "@/data/student";

type AuthCtx = {
  isAuthenticated: boolean;
  login: (ra: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "portal-aluno-auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const login = (ra: string, password: string) => {
    if (ra.trim() === student.ra && password === student.password) {
      localStorage.setItem(STORAGE_KEY, "1");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
