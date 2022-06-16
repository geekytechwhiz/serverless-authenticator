import { SignInDetails } from '../interfaces/IUser';
import { signIn } from '../services/signIn';
import { responseBuilder } from '../utils/helper';

export const handler = async (event: any) => {
  const body = JSON.parse(event.body);
  try {
    let user: SignInDetails = {
      EmailId: body.EmailId,
      Password: body.Password,
      Remember: body.Remember,
    };
    return signIn(user)
      .then(async (user) => {
        const data = await responseBuilder(user, 200);
        return data;
      })
      .catch(async (err) => {
        console.log({ err });
        const data = await responseBuilder(err, 500);
        return data;
      });
  } catch (err) {
    console.error(`Error: ${err}`);
    const data = await responseBuilder(err, 500);
    return data;
  }
};
