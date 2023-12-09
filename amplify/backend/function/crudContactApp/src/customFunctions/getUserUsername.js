const {
  CognitoIdentityProvider,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoIdentityProvider = new CognitoIdentityProvider();

const getUserUsername = async (userId) => {
  const params = {
    UserPoolId: "us-east-1_adrQRFvAV",
    Filter: `sub = "${userId}"`,
  };

  try {
    const userData = await cognitoIdentityProvider.listUsers(params);

    if (userData.Users.length === 1) {
      const user = userData.Users[0];
      return user.Username;
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user email:", error);
    return "Error fetching user email";
  }
};

module.exports = { getUserUsername };
