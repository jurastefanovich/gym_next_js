"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useGet } from "@/app/hooks/useGet";
import { ProfileResponse } from "../_features/utils/Interfaces";
import { UserApi } from "../_features/enums/ApiPaths";
import MyLoader from "../components/MyLoader";
import { useRouter } from "next/navigation";

interface AuthContextType {
  refetch: (user: ProfileResponse | null) => void;
  loading: boolean;
  data: ProfileResponse | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, error, refetch } = useGet<ProfileResponse>(
    UserApi.PROFILE
  );
  const router = useRouter();

  useEffect(() => {
    // If network error or unauthorized, log out
    if (error) {
      const isNetworkError = error?.request && !error?.response;
      const isUnauthorized = error?.response?.status === 401;

      if (isNetworkError || isUnauthorized) {
        console.warn("Logging out due to error:", error.message || error);
        // Optionally clear token/localStorage here
        localStorage.clear(); // or remove token
        router.push("/");
      }
    }
  }, [error, router]);

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
