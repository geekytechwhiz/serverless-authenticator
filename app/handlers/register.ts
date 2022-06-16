import bcrypt from 'bcryptjs';
import { IUsers } from '../interfaces/IUser';
import { createUser } from '../services/createUser';
import { responseBuilder } from '../utils/helper';

export const handler = async (event: any) => {
  const body = JSON.parse(event.body);
  const passwordHash = await bcrypt.hash(body.Password, 8);
  let user: IUsers = {
    UserId: `U${new Date().getTime()}`,
    EmailId: body.EmailId,
    Password: passwordHash,
    UserType: body.UserType || '',
    Otp: {},
    CreatedAt: new Date().toLocaleString(),
    UpdatedAt: new Date().toLocaleString(),
  };
  return createUser(user)
    .then((res) => {
      const data = responseBuilder(res, 200);
      return data;
    })
    .catch((err) => {
      console.log({ err });
      const data = responseBuilder(err, 500);
      return data;
    });
};
