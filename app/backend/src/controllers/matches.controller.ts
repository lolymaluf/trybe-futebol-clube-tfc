import { Request, Response } from 'express';
import MatchesServices from '../services/matches.service';

const matchesServices = new MatchesServices();

export default class MatchesController {
  getAll = async (req: Request, res: Response) => {
    const matches = await matchesServices.getAll();

    return res.status(200).json(matches);
  };
}
