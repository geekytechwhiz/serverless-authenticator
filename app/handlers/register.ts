import { IUsers } from "../interfaces/IUsers";
import { createUser } from "../services/createUser"; 
import middy from "@middy/core";
import cors from "@middy/http-cors";
import bcrypt from 'bcrypt'

  const registerUser = async (event:any)=>{
    const body = JSON.parse(event.body);
     const passwordHash = await bcrypt.hash(body.Password, 8);
     let user:IUsers={
        UserID: `U${new Date().getTime()}`,
        EmailID:body.EmailID,
        Password:passwordHash,
        UserType:'Brand',
        CreatedAt:new Date().toLocaleString()

     }
    return createUser(user)
      .then(user => ({
        statusCode: 200,
        body: JSON.stringify(user)
      }))
      .catch(err => {
        console.log({ err });
  
        return {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ stack: err.stack, message: err.message })
        };
      });
  };
  
export const handler =  middy(registerUser).use(cors())