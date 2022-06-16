import { documentClient } from '../utils/config';
import { UsersTable } from '../utils/constants';
import createError from 'http-errors';

export const updateOtp = async (emailId, otpDetails) => {
  try {
    const now = new Date();
    const params = {
      TableName: UsersTable,
      Key: {
        EmailId: emailId,
      },
      ExpressionAttributeNames: {
        '#Otp': 'Otp',
        '#UpdatedAt': 'UpdatedAt',
      },
      ExpressionAttributeValues: {
        ':otp': otpDetails,
        ':UpdatedAt': now.toUTCString(),
      },
      UpdateExpression: 'SET #Otp = :otp, #UpdatedAt = :UpdatedAt',
      ReturnValues: 'ALL_NEW',
    };
    console.info(
      `Edit Brand Begins: Service Table - ${UsersTable}'-'${params}`
    );
    const res = await documentClient.update(params).promise();
    if (!res) {
      throw new createError.InternalServerError('Error while updateOtp ');
    }
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(res.Attributes),
      }} Method: POST Action:updateOtp `
    );
    return res.Attributes;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
