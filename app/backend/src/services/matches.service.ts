import MatchesModels from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { ISaveMatch } from '../interfaces/matches.interfaces';

export default class MatchesService {
  public get = async () => {
    const matchesresult = await MatchesModels.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matchesresult;
  };

  public getMatches = async (inProgress:boolean) => {
    const matches = await this.get();
    const notProgress = matches.filter((game) => game.inProgress === inProgress);
    return notProgress;
  };

  public inProgress = async (match: ISaveMatch) => {
    const takeTeams = await Promise.all([
      TeamsModel.findByPk(match.awayTeam),
      TeamsModel.findByPk(match.homeTeam),
    ]);
    if (!takeTeams.every((team) => team)) {
      return { status: 404, message: 'There is no team with such id!' };
    }
    const create = await MatchesModels.create({ ...match, inProgress: true });

    if (match.awayTeam === match.homeTeam) {
      return { status: 422, message: 'It is not possible to create a match with two equal teams' };
    }

    return { status: null, message: create };
  };

  public finishedMatches = async (id:number) => {
    await MatchesModels.update({ inProgress: false }, { where: { id } });
    return { status: null, message: 'Finished' };
  };

  public updateMatches = async (id:number, homeTeamGoals:number, awayTeamGoals: number) => {
    const up = await MatchesModels.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: null, message: up };
  };
}
