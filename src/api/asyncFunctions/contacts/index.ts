import { API, Auth, Storage } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

import { SingleContact, UnsavedSingleContact } from "types";

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
): Promise<{ data: SingleContact } | { error: FetchBaseQueryError }> {
  try {
    const data = await API.get(apiName, `${path}/object/${contactId}`, {});
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}

export async function createContact(
  contact: UnsavedSingleContact
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

export async function editContact(
  contact: SingleContact
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    const data = await API.put(apiName, `${path}`, { body: contact });
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}

export async function deleteOneContact(
  contactId: string
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    const data = await API.del(apiName, `${path}/object/${contactId}`, {});
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}

export async function deleteManyContacts(
  selectedIds: string[]
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    const data = await API.post(apiName, `${path}/deleteMany`, {
      body: selectedIds,
    });
    return { data: data };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}

export async function uploadImageToS3(
  photo: File
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    const result = await Storage.put(photo.name, photo, {
      contentType: photo.type,
    });

    const imageUrl = await Storage.get(result.key);
    return { data: imageUrl };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}
