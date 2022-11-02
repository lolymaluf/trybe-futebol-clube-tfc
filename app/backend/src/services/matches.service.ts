import TeamModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchService {
  private _matchesModel = MatchesModel;
  private _teamModel = TeamModel;

  public async getAllMatches() {
    const findMatches = await this._matchesModel.findAll({
      include: [
        { model: this._teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this._teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return findMatches;
  }

  public async matchInProgress(status: boolean) {
    const findMatches = await this._matchesModel.findAll({
      where: { inProgress: status },
      include: [
        { model: this._teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: this._teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return findMatches;
  }
}
