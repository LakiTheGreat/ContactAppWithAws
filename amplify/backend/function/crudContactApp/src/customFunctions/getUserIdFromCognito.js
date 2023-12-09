//userId = userName from cognito
const getUserIdFromRequest = (req) => {
  const userId =
    req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(
      ":CognitoSignIn:"
    )[1];
  return userId;
};

module.exports = { getUserIdFromRequest };
