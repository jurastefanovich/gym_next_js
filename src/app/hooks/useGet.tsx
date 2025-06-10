"use client";

import { useEffect, useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { getAccessToken } from "../_features/utils/LocalStorageHelpers";

interface UseGetResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGet<T = any>(
  url: string | null,
  config?: AxiosRequestConfig
): UseGetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useSnackbar();

  const fetchData = useCallback(async () => {
    if (!url) return;
    const token = getAccessToken();
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, {
        ...config,
        headers: {
          ...authHeader,
          ...config?.headers,
        },
      });
      setData(response.data);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      setError(message);
      showMessage(message, "error");
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
