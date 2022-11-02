import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenValidation from '../middlewares/token.validation';

const matchesController = new MatchesController();
const router = Router();

router.get('/matches', matchesController.getAllMatches);
router.post('/matches', tokenValidation, matchesController.inProgress);
router.patch('/matches/:id', matchesController.updateMatches);
router.patch('/matches/:id/finish', matchesController.finishedMatches);

export default router;
