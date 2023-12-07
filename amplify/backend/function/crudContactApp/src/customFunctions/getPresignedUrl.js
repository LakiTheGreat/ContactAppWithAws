const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client();
let bucketName = "images141736-dev";

const PRESIGNED_URL_EXPIRATION_SECONDS = 300;

const getPresignedUrl = async (key, cognitoIdentityId) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      // Key: `public/${key}`, //if public bucket is used
      Key: `private/${cognitoIdentityId}/${key}`,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRATION_SECONDS,
    });

    return presignedUrl;
  } catch (error) {
    console.error("Error getting presigned URL:", error);
    throw error;
  }
};

module.exports = { getPresignedUrl };
