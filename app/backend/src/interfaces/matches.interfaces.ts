import { ITeam } from './teams.interfaces';

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  teamHome?: ITeam,
  teamAway?: ITeam
}
