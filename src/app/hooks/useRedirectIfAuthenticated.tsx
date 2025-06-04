// hooks/useRedirectIfAuthenticated.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or 'next/router'
import { getToken } from "../_features/utils/LocalStorageHelpers";
/**
 * Method blocks going to auth pages like login, sign up etc
 */
export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.replace("/");
    }
  }, [router]);
}
