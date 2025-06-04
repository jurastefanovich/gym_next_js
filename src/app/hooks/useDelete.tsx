// app/hooks/useDelete.ts
"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";

interface UseDeleteResult<T> {
  data: T | null;
  loading: boolean;
  deleteRequest: (url: string, config?: AxiosRequestConfig) => Promise<void>;
}

export function useDelete<T = any>(): UseDeleteResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();

  const deleteRequest = async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.delete<T>(url, config);
      setData(response.data);
    } catch (err: any) {
      showMessage(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message ||
              err.message ||
              "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, deleteRequest };
}
