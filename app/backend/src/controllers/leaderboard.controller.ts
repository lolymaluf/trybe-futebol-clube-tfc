import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.service';

class LeaderboardController {
  leaderboardServices: LeaderboardServices;

  constructor() {
    this.leaderboardServices = new LeaderboardServices();
  }

  getLeaderboardResultsHome = async (_req: Request, res: Response) => {
    const leaderboardHome = await this.leaderboardServices.getLeaderboardHome();
    return res
      .status(200)
      .json(leaderboardHome);
  };
}

export default LeaderboardController;
