// hooks/useRedirectIfAuthenticated.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // or 'next/router'
import { getAccessToken } from "../_features/utils/LocalStorageHelpers";
/**getAccessToken
 * Method blocks going to auth pages like login, sign up etc
 */
export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      router.replace("/");
    }
  }, [router]);
}
