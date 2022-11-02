import { Request, Response } from 'express';
import LoginService from '../services/login.service';

const loginService = new LoginService();

export default class LoginController {
  public login = async (req: Request, res: Response) => {
    const { message, code } = await loginService
      .login(req.body);
    if (code) {
      return res
        .status(code)
        .json({ message });
    }
    return res
      .status(200)
      .json({ token: message });
  };

  public getRole = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const role = await loginService.validate(token as string);
    return res
      .status(200)
      .json({ role });
  };
}
