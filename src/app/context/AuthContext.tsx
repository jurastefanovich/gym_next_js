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
import MyLoader from "../components/MyLoader";

interface AuthContextType {
  refetch: (user: ProfileResponse | null) => void;
  loading: boolean;
  data: ProfileResponse | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, refetch } = useGet<ProfileResponse>(UserApi.PROFILE);

  if (loading) {
    return <MyLoader />;
  }

  return (
    <AuthContext.Provider value={{ loading, data, refetch }}>
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
