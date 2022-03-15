import { IUsers, SiginDetails } from "../interfaces/IUsers";
import { createUser } from "../services/createUser";
import bcrypt from "bcrypt";
import { signIn } from "../services/signIn";
import middy from "@middy/core";
import cors from "@middy/http-cors";

 const signInUser = async(event: any)=>{
   ;
  const body = JSON.parse(event.body);
  try {
    let user: SiginDetails = {
      EmailID: body.EmailID,
      Password: body.Password 
    };
    return signIn(user)
      .then((user) => (
        {
        statusCode: 200,
        body: JSON.stringify(user),
      }))
      .catch((err) => {
        console.log({ err }); 
        return {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body:  JSON.stringify({ stack: err.stack, message: err.message }),
        };
      });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
export const handler =  middy(signInUser).use(cors())