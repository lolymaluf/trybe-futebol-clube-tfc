import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const route = Router();
const matchesController = new MatchesController();

route.get('/matches', matchesController.getAll);

export default route;
