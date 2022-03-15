 
import AWS from "aws-sdk";  
const awsConfig = {
  accessKeyId: "AKIAZYADTUF3SY5V6HHW",
  secretAccessKey: "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",
  region: "ap-south-1",
};
 AWS.config.update(awsConfig);
 const dynamoDB = new AWS.DynamoDB();
 const documentClient = new AWS.DynamoDB.DocumentClient();
export { dynamoDB, documentClient };
