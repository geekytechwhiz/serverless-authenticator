import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
export const getUserFromToken = (token: any) => {
  const secret = Buffer.from(JWT_SECRET, 'base64');
  const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
  return decoded;
};
