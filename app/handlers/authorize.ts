import { JWT_SECRET } from "../utils/constants";
import jwt from "jsonwebtoken";
import middy from "@middy/core";
import cors from "@middy/http-cors";
import 'dotenv/config'

const verifyToken = async(
  event: any,
  context: any,
  callback: any
) =>{ 
  debugger;
  // let stage = process.env.STAGE
  const token = event.authorizationToken.replace("Bearer ", "");

  // if(stage=='dev'){
  //   return {
  //     principalId:"local",
  //     policyDocument:'allow',
  //   }
     
  // }
  const methodArn = event.methodArn;

  if (!token || !methodArn) return callback(null, "Unauthorized");

  const secret = Buffer.from(JWT_SECRET, "base64");

  // verifies token
  const decoded: any = jwt.verify(token, secret); 
  if (decoded && decoded.email) {
    return await generateAuthResponse(decoded.email, "Allow", methodArn)
  } else {
    return await generateAuthResponse(decoded.email, "Deny", methodArn)
  }
};

function generateAuthResponse(principalId: any, effect: any, methodArn: any) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument,
  };
}

function generatePolicyDocument(effect: any, methodArn: any) {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };

  return policyDocument;
}
export const handler =  middy(verifyToken).use(cors())