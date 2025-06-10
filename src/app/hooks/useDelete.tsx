// app/hooks/useDeleteAuth.ts
"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { getAccessToken } from "../_features/utils/LocalStorageHelpers";

interface UseDeleteResult<T> {
  data: T | null;
  loading: boolean;
  deleteRequest: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<T | null>;
}

export function useDelete<T = any>(): UseDeleteResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();

  const deleteRequest = async (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | null> => {
    setLoading(true);
    const token = getAccessToken();

    const authHeaders: AxiosRequestConfig = {
      ...config,
      headers: {
        ...(config?.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response: AxiosResponse<T> = await axios.delete<T>(
        url,
        authHeaders
      );
      setData(response.data);
      showMessage("Action completed!", "success");
      return response.data;
    } catch (err: any) {
      showMessage(
        err?.response?.data?.message || err.message || "Something went wrong",
        "error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, deleteRequest };
}
