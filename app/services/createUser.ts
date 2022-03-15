import AWS from "aws-sdk";
import createError from "http-errors";
import { documentClient } from "../utils/config";
import { UsersTable } from "../utils/constants";  

export const createUser = async (request: any) => {
  try { 
    console.info(`Request: createUser - ${UsersTable}'-'${request.UserID}`); 
   let res= await documentClient
      .put({
        TableName: UsersTable,
        Item: request,
      })
      .promise();

    console.info("Response: createUser :", res);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(request),
  };
};

export const GetBrand = () => {
  console.info("Get Brand Called");
};
