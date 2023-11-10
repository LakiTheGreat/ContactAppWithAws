import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { CognitoUser } from "amazon-cognito-identity-js";
import { API, Auth } from "aws-amplify";
import { SingeContactFormValues } from "types";

const apiName = "apiContactApp";
const path = "/contacts";

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export async function getCurrentUser(): Promise<
  { data: CognitoUser } | { error: FetchBaseQueryError }
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

export async function getAllContacts(): Promise<
  { data: any } | { error: FetchBaseQueryError }
> {
  // const user: CognitoUser = await Auth.currentAuthenticatedUser();
  // const username = await user.getUsername();
  //   const token = user.getSignInUserSession()?.getAccessToken().getJwtToken();

  try {
    const data = await API.get(apiName, `${path}`, {});
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}
export async function getContactById(
  contactId: string
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    // const user = await Auth.currentAuthenticatedUser();
    // const userId = user.attributes.sub;

    const data = await API.get(
      apiName,
      `${path}/object/${contactId}`,
      // `${path}/object/${userId}/${contactId}`,
      {}
    );
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}
export async function createContact(
  contact: SingeContactFormValues
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    const data = await API.post(apiName, `${path}`, { body: contact });
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}
