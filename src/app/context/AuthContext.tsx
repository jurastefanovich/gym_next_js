"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useGet } from "@/app/hooks/useGet";
import { ProfileResponse } from "../_features/utils/Interfaces";
import { UserApi } from "../_features/enums/ApiPaths";

interface AuthContextType {
  user: ProfileResponse | null;
  setUser: (user: ProfileResponse | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileResponse | null>(null);

  const { data, loading } = useGet<ProfileResponse>(UserApi.PROFILE); // call /me or similar to fetch user info

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
