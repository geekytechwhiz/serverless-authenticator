import createError from 'http-errors';
import { sendSms } from '../functions/twilioSms';
import { OtpDetails } from '../interfaces/IUser';
import {
  IHandlerEventBody,
  ISendMessageParams,
  RequestAction,
} from '../interfaces/SMSServices';
import { updateOtp } from '../services/updateOtp';
import {
  GenerateOTP,
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/helper';
export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:generateOTP `
    );
    let validateResponse = ValidateHeader(event['headers']);

    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest: any = MakeHeaderRequest(event['headers']);
    console.info(
      `Request: Path: ${event.path}, Method:${
        event.httpMethod
      } Headers:${JSON.stringify(event.headers)}, Body:${JSON.stringify(
        event.body
      )} TraceId: ${headerRequest.TraceId}`
    );

    if (!event.body) {
      const err = new createError.NotFound('Body Missing');
      return responseBuilder(err, 400);
    }

    let requestBody: IHandlerEventBody = event.body;
    try {
      console.info(
        `Request Body: ${JSON.stringify(
          requestBody
        )} Method: POST Action:generateOTP `
      );
    } catch (err) {
      return responseBuilder(err, 400);
    }

    switch (requestBody.action) {
      case RequestAction.GENERATE_OTP: {
        if (!requestBody)
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'arguments missing' }),
          };

        if (!requestBody.countryCode)
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'countryCode is required' }),
          };
        if (!requestBody.contactNumber)
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'contactNumber is required' }),
          };
        if (!requestBody.emailId)
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'emailId is required' }),
          };
        const countryCode = requestBody.countryCode as string;
        const contactNumber = requestBody.contactNumber as string;
        const details = GenerateOTP();
        const otpDetails: OtpDetails = {
          Otp: details.otp,
          ExpiresIn: details.expiresIn,
        };
        const response = await updateOtp(requestBody.emailId, otpDetails);
        if (!response) {
          return responseBuilder('Error', 500);
        }
        const smsRequest: ISendMessageParams = {
          to: `${countryCode}${contactNumber}`,
          message: `Your Migobucks OTP is ${otpDetails.Otp}`,
        };
        const res = await sendSms(smsRequest);
        if (!res) {
          return responseBuilder(
            'Something went wrong while sending the SMS',
            500
          );
        }
        let expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 2);

        return responseBuilder(otpDetails, 200);
      }
    }
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return responseBuilder(error, 500);
  }
};
