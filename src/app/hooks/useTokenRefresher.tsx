// app/hooks/useTokenRefresher.ts
"use client";

import { useEffect, useRef } from "react";
import axios from "axios";
import {
    getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "../_features/utils/LocalStorageHelpers";

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
//SOMETHING IS WRONG HERE!!! INVESTIGATE!!!!
export const useTokenRefresher = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const refresh = async () => {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return;

        const response = await axios.post(
          "http://localhost:8080/auth/refresh-token", // Adjust to your actual endpoint
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = response.data?.accessToken;
        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }
      } catch (err) {
        console.error("Failed to refresh token:", err);
        // Optionally handle logout or re-authentication here
      }
    };

    // Immediately attempt a refresh once on mount
    refresh();

    // Then refresh every 10 minutes
    intervalRef.current = setInterval(refresh, REFRESH_INTERVAL_MS);

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};
