import * as jwt from 'jsonwebtoken';
import 'dotenv';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const validateToken = (token: string) => {
  const checkToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  return (checkToken.data);
};

export default validateToken;
