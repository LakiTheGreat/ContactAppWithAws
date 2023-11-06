import { Auth } from "aws-amplify";

export async function currentAuthenticatedUser() {
  try {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional and is false by default. If set to true, this call
      // will send a request to Cognito to get the latest user data.
    });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}
