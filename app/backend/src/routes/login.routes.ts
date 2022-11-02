import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginMiddleware from '../middlewares/login.middlewares';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginMiddleware, (req, res) => loginController.login(req, res));
router.get('/login/validate', (req, res) => loginController.getRole(req, res));

export default router;
