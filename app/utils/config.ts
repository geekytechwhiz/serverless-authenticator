import AWS from 'aws-sdk';
const awsConfig = {
  accessKeyId: 'AKIAZYADTUF3SY5V6HHW',
  secretAccessKey: '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',
  region: 'ap-south-1',
};
AWS.config.update(awsConfig);
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();
export { dynamoDB, documentClient };

export const TWILIO_CONFIG = {
  fromNumber: process.env.twilio_fromNumber || '+12542796043',
  accountSid:
    process.env.twilio_accountSid || 'AC6753714c4d48af524d90cd672c6cebd3',
  authToken: process.env.twilio_authToken || 'b231fca950f13c3460fab21ca57ee255',
};
