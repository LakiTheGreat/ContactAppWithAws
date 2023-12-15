/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const snsClient = new SNSClient();

exports.handler = async (event) => {
  const records = event.Records;
  const originalMessage = JSON.parse(records[0].body).Message;

  const SendEmailTopic = "arn:aws:sns:us-east-1:739894200830:SendEmailTopic";

  const params = {
    Message: `${originalMessage} - THIS MESSAGE WAS SEND FROM QUEUE`,
    TopicArn: SendEmailTopic,
  };

  try {
    const result = await snsClient.send(new PublishCommand(params));
    console.log(
      "SNS message sent successfully:",
      result.MessageId,
      `Message: ${originalMessage}`
    );
  } catch (error) {
    console.error("Error sending SNS message:", error);
    throw error;
  }
};
