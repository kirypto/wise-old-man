import prisma, { PrismaTypes } from '../../../../prisma';
import { Country, Metric, Period, Player, PlayerBuild, PlayerStatus, PlayerType } from '../../../../types';

const MAX_RESULTS = 20;

type Filter = {
  country?: Country;
  playerType?: PlayerType;
  playerBuild?: PlayerBuild;
};

async function findDeltaLeaderboards(
  period: Period,
  metric: Metric,
  filter: Filter
): Promise<
  Array<{
    player: Player;
    startDate: Date;
    endDate: Date;
    gained: number;
  }>
> {
  const { country, playerType, playerBuild } = filter;

  const where: PrismaTypes.CachedDeltaWhereInput = {
    period,
    metric,
    playerStatus: PlayerStatus.ACTIVE
  };

  if (country) where.playerCountry = country;
  if (playerBuild) where.playerBuild = playerBuild;

  // When filtering by player type, the ironman filter should include UIM and HCIM
  if (playerType) {
    where.playerType =
      playerType === PlayerType.IRONMAN
        ? { in: [PlayerType.IRONMAN, PlayerType.HARDCORE, PlayerType.ULTIMATE] }
        : playerType;
  }

  const deltas = await prisma.cachedDelta.findMany({
    where,
    select: {
      playerId: true,
      metric: true,
      value: true,
      startedAt: true,
      endedAt: true,
      player: true
    },
    orderBy: [{ value: 'desc' }, { updatedAt: 'asc' }],
    take: MAX_RESULTS
  });

  return deltas.map(d => ({
    player: d.player,
    startDate: d.startedAt,
    endDate: d.endedAt,
    gained: Math.max(0, d.value)
  }));
}

export { findDeltaLeaderboards };
