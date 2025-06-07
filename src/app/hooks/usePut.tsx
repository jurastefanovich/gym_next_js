// app/hooks/usePut.ts
"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useSnackbar } from "../context/SnackbarContext";

interface UsePutResult<T> {
  data: T | null;
  loading: boolean;
  put: (url: string, body: any, config?: AxiosRequestConfig) => Promise<void>;
}

export function usePut<T = any>(): UsePutResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useSnackbar();

  const put = async (url: string, body: any, config?: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.put<T>(url, body, config);
      setData(response.data);
    } catch (err: any) {
      showMessage(
        err?.response?.data?.message || err.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, put };
}
