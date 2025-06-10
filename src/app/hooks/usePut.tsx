// app/hooks/usePutAuth.ts
"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { getAccessToken } from "../_features/utils/LocalStorageHelpers";

interface UsePutResult<T> {
  data: T | null;
  loading: boolean;
  put: (
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ) => Promise<T | null>;
}

export function usePut<T = any>(): UsePutResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();

  const put = async (
    url: string,
    body: any,
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
      const response: AxiosResponse<T> = await axios.put<T>(
        url,
        body,
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

  return { data, loading, put };
}
