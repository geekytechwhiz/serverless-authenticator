import createError from 'http-errors';
import { IVerifyOtpParams } from '../interfaces/SMSServices';
import { verifyOtp } from '../services/verifyOtp';
import {
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

    let requestBody: IVerifyOtpParams;
    try {
      requestBody = event.body;
      console.info(
        `Request Body: ${JSON.stringify(
          requestBody
        )} Method: POST Action:generateOTP `
      );
    } catch (err) {
      return responseBuilder(err, 400);
    }

    if (!requestBody)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'arguments missing' }),
      };

    if (!requestBody.emailId)
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'emailId is required' }),
      };
    let response = await verifyOtp(requestBody);
    if (!response) {
      return responseBuilder('Error', 500);
    }
    const res = JSON.stringify(response);
    response = JSON.parse(res);
    return responseBuilder(response, 200);
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return responseBuilder(error, 500);
  }
};
