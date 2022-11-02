import TeamModel from '../database/models/TeamsModel';
import { ITeam } from '../interfaces/teams.interfaces';

class TeamService {
  private model = TeamModel;

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async getOne(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}

export default TeamService;
