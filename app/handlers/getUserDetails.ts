import { getUserByEmailID } from '../services/signIn';
import { getUserFromToken } from '../services/utlis';
import { responseBuilder } from '../utils/helper';

export const handler = async function (event: any) {
  const userObj: any = await getUserFromToken(event.headers.Authorization);
  const dbUser = await getUserByEmailID(userObj.email);
  const data = responseBuilder(dbUser);
  return data;
};
