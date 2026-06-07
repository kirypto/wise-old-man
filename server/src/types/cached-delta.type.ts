import { Country } from './country.enum';
import { Metric } from './metric.enum';
import { Period } from './period.enum';
import { PlayerBuild } from './player-build.enum';
import { PlayerStatus } from './player-status.enum';
import { PlayerType } from './player-type.enum';

export interface CachedDelta {
  playerId: number;
  period: Period;
  metric: Metric;
  value: number;
  startedAt: Date;
  endedAt: Date;
  updatedAt: Date;
  playerBuild: PlayerBuild;
  playerType: PlayerType;
  playerCountry: Country | null;
  playerStatus: PlayerStatus;
}
