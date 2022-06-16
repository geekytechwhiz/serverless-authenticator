import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { documentClient } from '../utils/config';
import {
  JWT_SECRET,
  TOKEN_EXPIRED_160_DAYS,
  UsersTable,
} from '../utils/constants';

async function signToken(user: any, hasRemember = false) {
  const secret = Buffer.from(JWT_SECRET, 'base64');
  debugger;
  return jwt.sign({ email: user.EmailID, roles: ['USER'] }, secret, {
    expiresIn: hasRemember ? 86400 + TOKEN_EXPIRED_160_DAYS : 86400, // 86400 sec is 24 hours
  });
}
function comparePassword(eventPassword: any, userPassword: any) {
  debugger;
  if (!eventPassword || !userPassword) {
    return null;
  }
  return bcrypt.compare(eventPassword, userPassword);
}

export const signIn = async (args: any) => {
  let response = {
    auth: false,
    token: null,
    status: {
      statusCode: 401,
      message: 'Unauthorized',
    },
  };
  try {
    const user = await getUserByEmailID(args.EmailId);
    debugger;
    if (!user || (args && !args.Password) || (user && !user.Password)) {
      response.status = {
        statusCode: 404,
        message: 'User Not found',
      };
      return response;
    }
    const isValidPassword = await comparePassword(args.Password, user.Password);

    if (isValidPassword) {
      const token = await signToken(user, args.Remember);
      if (!token) return response;
      response = {
        auth: true,
        token: token,
        status: {
          statusCode: 200,
          message: 'Success',
        },
      };
      return response;
    } else {
      return response;
    }
  } catch (err: any) {
    response.status = {
      statusCode: 500,
      message: 'internal server error',
    };
    return Promise.reject(response);
  }
};

export const getUserByEmailID = async (emailID: any) => {
  const params = {
    TableName: UsersTable,
    Key: {
      EmailId: emailID,
    },
    ConsistentRead: true,
    ReturnConsumedCapacity: 'TOTAL',
  };

  try {
    const results: any = await documentClient.get(params).promise();
    console.log('Result', results);
    if (!results.Item) {
      return null;
    }
    console.log('data', JSON.stringify(results.Item, null, 2));
    return results.Item;
  } catch (error: any) {
    console.error(error);
    return error;
    // throw new createError.InternalServerError(error);
  }
};
export const GetBrand = () => {
  console.info('Get Brand Called');
};
