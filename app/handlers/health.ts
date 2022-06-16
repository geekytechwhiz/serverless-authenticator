import {
  MakeHeaderRequest,
  responseBuilder,
  ValidateHeader,
} from '../utils/helper';

export const handler = async (event: any, context: any) => {
  console.log(context);
  let validateResponse = ValidateHeader(event['headers']);
  if (!validateResponse.Status) {
    const data = await responseBuilder(validateResponse);
    return data;
  }
  const headerRequest = MakeHeaderRequest(event['headers']);

  console.log('Header', headerRequest);
  let response = {
    status: true,
    message: 'Authenticator Api Health CHeck Passed',
  };
  const data = await responseBuilder(response);
  return data;
};
export const get = async (event, context) => {
  // Do work to create Product
  console.log(context);
  let validateResponse = ValidateHeader(event['headers']);
  if (!validateResponse.Status) {
    const data = await responseBuilder(validateResponse);
    return data;
  }
  const headerRequest = MakeHeaderRequest(event['headers']);

  console.log('Header', headerRequest);
  let response = {
    status: true,
    message: 'Authenticator Api Health CHeck Passed',
  };
  const data = await responseBuilder(response);
  return data;
};

export const post = async (event, context) => {
  // Do work to create Product
  console.log(context);
  let validateResponse = ValidateHeader(event['headers']);
  if (!validateResponse.Status) {
    const data = await responseBuilder(validateResponse);
    return data;
  }
  const headerRequest = MakeHeaderRequest(event['headers']);

  console.log('Header', headerRequest);
  let response = {
    status: true,
    message: 'Authenticator Api Health Check Passed',
  };
  const data = await responseBuilder(response);
  return data;
};
