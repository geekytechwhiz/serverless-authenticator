import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/helper';
import { getUserByEmailID } from '../utils/httpClient';

export const handler = async (event: any) => {
  try {
    console.info(`Request - Method: Get Action:GetBrand `);
    let validateResponse = ValidateHeader(event['headers']);
    if (!validateResponse.Status) {
      return responseBuilder(validateResponse, 400);
    }
    const headerRequest = MakeHeaderRequest(event['headers']);
    console.log('Header', headerRequest);

    if (!event.pathParameters) {
      const err = 'Bad Input';
      const data = responseBuilder(err, 400);
      return data;
    }

    const params = event.pathParameters.EmailId;
    let response = await getUserByEmailID(params);

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:GetBrand `
    );
    const data = responseBuilder(response, 200);
    return data;
  } catch (error: any) {
    console.error(error);
    const data = responseBuilder(error, 500);
    return data;
  }
};
