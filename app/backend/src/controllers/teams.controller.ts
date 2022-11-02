import { Request, Response } from 'express';
// import TeamsService from '../services/teams.service';
import { ITeamService } from '../interfaces/teams.interfaces';

export default class TeamsController {
  private service: ITeamService;

  constructor(service: ITeamService) {
    this.service = service;
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const teams = await this.service.getAll();
    return res
      .status(200)
      .json(teams);
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.service.getOne(+id);

    return res
      .status(200)
      .json(team);
  }
}
