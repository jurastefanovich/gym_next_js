// app/hooks/useGet.ts
"use client";

import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import {
  getAccessToken,
  getRefreshToken,
} from "../_features/utils/LocalStorageHelpers";

interface UseGetResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useGet<T = any>(
  url: string | null,
  config?: AxiosRequestConfig
): UseGetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useSnackbar();

  useEffect(() => {
    if (!url) return;
    const token = getAccessToken();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<T> = await axios.get<T>(url, {
          ...config,
          headers: {
            ...authHeader,
          },
        });
        setData(response.data);
        return data;
      } catch (err: any) {
        const message =
          err?.response?.data?.message || err.message || "Something went wrong";
        setError(message);
        showMessage(message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
