import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { Auth } from "aws-amplify";

interface Credentials {
  email: string;
  password: string;
}

export async function getCurrentUser(): Promise<
  { data: any } | { error: FetchBaseQueryError }
> {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { data: user };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}

export async function signInUser({ email, password }: Credentials) {
  const user = await Auth.signIn(email, password);
  return { data: user };
}
