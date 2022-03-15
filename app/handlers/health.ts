 
 import {getUserByEmailID} from '../services/signIn'
import { getUserFromToken } from '../services/utlis';

 export const handler = async function(event:any) {
  const userObj:any = await getUserFromToken(event.headers.Authorization);  
  const dbUser = await getUserByEmailID(userObj.email); 
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(dbUser)
  };
};
