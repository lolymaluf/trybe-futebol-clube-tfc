import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || ('jwt_secret' as jwt.Secret);

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static authenticateToken = async (token: string | undefined) => {
    if (!token) {
      return ({ code: 401, message: 'Token not found' });
    }
    const validateToken = jwt.verify(token, secret) as jwt.JwtPayload;
    return validateToken.payload.data.role;
  };
}
