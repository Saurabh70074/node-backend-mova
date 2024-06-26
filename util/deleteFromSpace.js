const { S3, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const config = require("../config");

const s3Client = new S3({
  forcePathStyle: false, //Configures to use subdomain/virtual calling format
  endpoint: config.endpoint,
  region: config.region,
  credentials: {
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_secret_access_key,
  },
});

const deleteFromSpace = async ({ folderStructure, keyName }) => {
  console.log("folderStructure in deleteFromSpace: ", folderStructure);
  console.log("keyName in deleteFromSpace: ", keyName);

  try {
    const bucketParams = {
      Bucket: config.bucketName,
      Key: `${folderStructure}/${keyName}`, //parentFolder/childFolder
    };

    console.log("Deleting object: ", bucketParams.Key);

    try {
      const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
      console.log("Successfully deleted object:", bucketParams.Bucket + "/" + bucketParams.Key);
      return data;
    } catch (err) {
      console.log("Error:", err);
    }
  } catch (err) {
    console.log("catch called in deleteFromSpace: ");
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

module.exports = { deleteFromSpace };
