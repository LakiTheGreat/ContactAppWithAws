import { API, Storage } from "aws-amplify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { v4 as uuidv4 } from "uuid";

import {
  SingleContact,
  SingleContactWithImageKey,
  UnsavedSingleContact,
} from "types";

const apiName = "apiContactApp";
const path = "/contacts";

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
): Promise<
  { data: SingleContactWithImageKey } | { error: FetchBaseQueryError }
> {
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
    const result = await Storage.put(`${photo.name}-${uuidv4()}`, photo, {
      contentType: photo.type,
      level: "private",
    });

    return { data: result.key };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}

export async function deleteImageFromS3(
  key: string
): Promise<{ data: any } | { error: FetchBaseQueryError }> {
  try {
    const result = await Storage.remove(key, {
      level: "private",
    });

    return { data: result };
  } catch (error) {
    return {
      error: error as FetchBaseQueryError,
    };
  }
}
