import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

enum CognitoUserError {
  NOT_AUTHENTICATED = "The user is not authenticated",
}

export default function useGetAuthenticatedUser() {
  const [authData, setAuthData] = useState<{
    data: any;
    isLoading: boolean;
    error: CognitoUserError | null;
  }>({
    data: null,
    isLoading: true,
    error: null,
  });

  async function fetchUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAuthData({ data: user, isLoading: false, error: null });
    } catch (error) {
      if (error && error === CognitoUserError.NOT_AUTHENTICATED) {
        setAuthData({
          data: null,
          isLoading: false,
          error: CognitoUserError.NOT_AUTHENTICATED,
        });
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return authData;
}
