import { BrandTable, HeaderConstants } from './constants';
import { dynamoDB } from './config';

export const responseBuilder = (data: any, status = 200) => {
  const response = {
    statusCode: status,
    data: data || {},
  };
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Allow-Headers':
        'Content-Type, Custom-Header,Access-Control-Allow-Headers,x-mibapi-customerid, X-MIBAPI-CustomerID,X-MIBAPI-CustomerType,x-mibapi-customertype,x-mibapi-token,X-MIBAPI-Token,x-mibapi-source,X-MIBAPI-Source,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, HEAD',
    },
    body: JSON.stringify(response),
  };
};
export const ValidateHeader = (headers: any) => {
  let errorMessages = [];

  // if (!headers) {
  //   return {
  //     Message: 'Bad Request',
  //     StatusCode: 400,
  //   };
  // }

  if (!headers[HeaderConstants.CustomerID]) {
    errorMessages.push(` ${HeaderConstants.CustomerID} 'is required'`);
  }
  if (!headers[HeaderConstants.CustomerType]) {
    errorMessages.push(` ${HeaderConstants.CustomerType} 'is required'`);
  }
  if (!headers[HeaderConstants.Source]) {
    errorMessages.push(` ${HeaderConstants.Source} 'is required'`);
  }
  if (!headers[HeaderConstants.Token]) {
    errorMessages.push(` ${HeaderConstants.Token} 'is required'`);
  }
  return {
    Message: errorMessages,
    Status: true, //errorMessages.length > 0 ? false : true,
    StatusCode: 200,
  };
};

export const MakeHeaderRequest = (headers: any) => {
  if (!headers) return null;

  let headerRequest: any = {};
  headerRequest['CustomerID'] = headers['X-MIBAPI-CustomerID'];
  headerRequest['CustomerType'] = headers['X-MIBAPI-CustomerType'];
  headerRequest['Source'] = headers['X-MIBAPI-Source'];
  headerRequest['Token'] = headers['X-MIBAPI-Token'];
  headerRequest['TraceId'] = headers['X-MIBAPI-Trace-Id'];
  return headerRequest;
};

export const GenerateOTP = () => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  var minutesToAdd = 10;
  var date = new Date();
  var expiresIn = date.getTime() + minutesToAdd * 60000;
  return {
    otp,
    expiresIn,
  };
};

export const validateEmail = async (brandRequest) => {
  try {
    let query = {
      Statement: `SELECT EmailId FROM "${BrandTable}" where EmailId = '${brandRequest.EmailId}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    if (brandRequest.EmailId == result.Items[0].EmailId.S) return true;
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
