import bcrypt = require('bcryptjs');
import UserModel from '../database/models/UsersModel';
import TokenManager from '../utils/jwt';
import validateToken from '../middlewares/login.authenticator';
import { ILogin, ITokenLogin, IReturnLogin } from '../interfaces/login.interfaces';

export default class LoginService {
  public login = async ({ email, password }: ILogin):Promise <ITokenLogin | IReturnLogin> => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return ({ code: 401, message: 'Incorrect email or password' });
    }

    const bcryptCheck = await bcrypt.compare(password, user.password);
    if (!bcryptCheck) {
      return ({ code: 401, message: 'Incorrect email or password' });
    }

    const token = TokenManager.makeToken(user);
    return { code: null, message: token };
  };

  public validate = (token:string) => {
    console.log('token validate service', token);
    const data = validateToken(token);
    return data.role;
  };
}
