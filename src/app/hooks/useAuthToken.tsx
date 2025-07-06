"use client";

import React from "react";
import { getAccessToken } from "../_features/utils/LocalStorageHelpers";

export function useAuthToken() {
  const [token, setToken] = React.useState(getAccessToken());

  React.useEffect(() => {
    const listener = () => setToken(getAccessToken());
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return token;
}
