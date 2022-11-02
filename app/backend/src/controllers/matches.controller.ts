import { NextFunction, Response, Request } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchController {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  public async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this._matchesService.getAllMatches();

      const { inProgress } = req.query as { inProgress: string };

      if (inProgress) {
        const filter = JSON.parse(inProgress);
        const result = await this._matchesService.matchInProgress(filter);
        return res.status(200).json(result);
      }

      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
