import Team from '../database/models/TeamsModel';
import { IMatch } from '../interfaces/matches.interfaces';
import Match from '../database/models/MatchesModel';

export default class MatchesServices {
  private model = Match;
  getAll = async (): Promise<IMatch[] | null> => {
    const matches = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  };
}
