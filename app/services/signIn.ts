import AWS from "aws-sdk";
import createError from "http-errors";
import { documentClient, dynamoDB } from "../utils/config";
import { JWT_SECRET, UsersTable } from "../utils/constants";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signToken(user: any) {
  const secret = Buffer.from(JWT_SECRET, "base64");

  return jwt.sign({ email: user.EmailID, roles: ["USER"] }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });
}
function comparePassword(eventPassword: any, userPassword: any) {
  return bcrypt.compare(eventPassword, userPassword);
}

export const signIn = async (args: any) => {
  try {
     ;
    const user = await getUserByEmailID(args.EmailID);

     ;
    const isValidPassword = await comparePassword(args.Password, user.Password);

    if (isValidPassword) {
      const token = await signToken(user);
      return { auth: true, token: token, status: "SUCCESS" };
    }
  } catch (err: any) {
    console.info("Error login", err);
    return Promise.reject(new Error(err));
  }
}; 

export const getUserByEmailID = async (emailID: any) => {
   ;
  const params = {
    TableName: UsersTable,
    Key: {
      EmailID: emailID,
    },
    ConsistentRead: true,
    ReturnConsumedCapacity: "TOTAL",
  };

  try {
    const results: any = await documentClient.get(params).promise();
    console.log("Result", results);
    if (!results.Item) {
      throw { Respone: "User not found" };
    }
    console.log("data", JSON.stringify(results.Item, null, 2));
     ;
    return results.Item;
  } catch (error: any) {
    console.error(error);
    return error
    // throw new createError.InternalServerError(error);
  }
};
export const GetBrand = () => {
  console.info("Get Brand Called");
};
