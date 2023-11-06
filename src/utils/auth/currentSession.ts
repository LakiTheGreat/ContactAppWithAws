import { Auth } from "aws-amplify";

export async function currentSession() {
  try {
    const currentSession = await Auth.currentSession();

    return currentSession;
  } catch (err) {
    console.log(err);
  }
}
