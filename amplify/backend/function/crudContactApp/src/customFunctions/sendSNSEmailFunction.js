const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const snsClient = new SNSClient();

const sendSNSEmail = async (message) => {
  const ContactIsCreatedTopicArn =
    "arn:aws:sns:us-east-1:739894200830:ContactIsCreatedTopic";
  const params = {
    Message: message,
    TopicArn: ContactIsCreatedTopicArn,
  };

  try {
    const result = await snsClient.send(new PublishCommand(params));
    console.log(
      "SNS message sent successfully:",
      result.MessageId,
      `Message: ${message}`
    );
  } catch (error) {
    console.error("Error sending SNS message:", error);
    throw error;
  }
};

module.exports = { sendSNSEmail };
