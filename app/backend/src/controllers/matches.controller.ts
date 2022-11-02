import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const progressStatus = (inProgress === 'true');
      const matches = await this.matchesService
        .getMatches(progressStatus);
      return res
        .status(200)
        .json(matches);
    }

    const matches = await this.matchesService.get();
    return res
      .status(200)
      .json(matches);
  };

  public inProgress = async (req: Request, res: Response) => {
    const progress = await this.matchesService
      .inProgress(req.body);
    if (progress.status) {
      return res
        .status(progress.status)
        .json({ message: progress.message });
    }
    return res
      .status(201)
      .json(progress.message);
  };

  public finishedMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const matches = await this.matchesService
      .finishedMatches(+id);
    if (matches.status) {
      return res
        .status(matches.status)
        .json({ message: matches.message });
    }
    return res
      .status(200)
      .json(matches.message);
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const up = await this.matchesService.updateMatches(+id, homeTeamGoals, awayTeamGoals);

    if (up.status) {
      return res
        .status(up.status)
        .json({ message: up.message });
    }
    return res
      .status(200)
      .json(up.message);
  };
}
