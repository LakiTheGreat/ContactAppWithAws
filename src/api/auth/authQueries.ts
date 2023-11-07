import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { Auth } from "aws-amplify";

// interface Credentials {
//   email: string;
//   password: string;
// }

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
