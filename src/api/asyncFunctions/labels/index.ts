import { API } from "aws-amplify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const apiName = "apiContactApp";
const path = "/labels";

export async function getAllLabels(): Promise<
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
