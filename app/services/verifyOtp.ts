import { IVerifyOtpParams } from '../interfaces/SMSServices';
import { dynamoDB } from '../utils/config';
import { UsersTable } from '../utils/constants';
import AWS from 'aws-sdk';

export const verifyOtp = async (params: IVerifyOtpParams) => {
  try {
    let query = {
      Statement: `SELECT Otp FROM "${UsersTable}" where EmailId = '${params.emailId}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    var otpDetails: any = result.Items.map((el) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );
    otpDetails = otpDetails ? otpDetails[0]?.Otp : null;
    if (!otpDetails) throw new Error('User Not Found');
    const currentTime = new Date().getTime();

    if (params.otp !== otpDetails.Otp) {
      return {
        authenticated: false,
        message: 'Invalid OTP',
      };
    } else if (currentTime >= otpDetails.ExpiresIn) {
      return {
        authenticated: false,
        message: 'OTP expired',
      };
    } else {
      return {
        authenticated: true,
        message: 'OTP verification success',
      };
    }
  } catch (error: any) {
    return error;
  }
};
