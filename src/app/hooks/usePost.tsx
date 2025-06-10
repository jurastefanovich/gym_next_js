// app/hooks/usePost.ts
"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";
import { getAccessToken } from "../_features/utils/LocalStorageHelpers";

export interface UsePostResult<T> {
  data: T | null;
  loading: boolean;
  post: (
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ) => Promise<T | null>;
}

// usePost.ts
export function usePost<T = any>(): UsePostResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();

  const post = async (url: string, body: any, config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, body, config);
      setData(response.data);
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

  return { data, loading, post };
}

export function usePostAuth<T = any>(): UsePostResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();

  const post = async (url: string, body: any, config?: AxiosRequestConfig) => {
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
      const response: AxiosResponse<T> = await axios.post<T>(
        url,
        body,
        authHeaders
      );
      showMessage("Action completed!", "success");
      setData(response.data);
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

  return { data, loading, post };
}
