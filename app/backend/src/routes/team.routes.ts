import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamService from '../services/teams.service';

const router = Router();
const teamService = new TeamService();
const teamController = new TeamsController(teamService);

router.get('/teams', (req, res) => teamController.getAll(req, res));
router.get('/teams/:id', (req, res) => teamController.getOne(req, res));

export default router;
