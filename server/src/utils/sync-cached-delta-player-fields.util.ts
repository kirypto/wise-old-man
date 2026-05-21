import prisma from '../prisma';
import { Player } from '../types';

type PlayerFields = Pick<Player, 'id' | 'build' | 'type' | 'country' | 'status'>;

async function syncCachedDeltaPlayerFields(player: PlayerFields) {
  return prisma.cachedDelta.updateMany({
    where: { playerId: player.id },
    data: {
      playerBuild: player.build,
      playerType: player.type,
      playerCountry: player.country,
      playerStatus: player.status
    }
  });
}

export { syncCachedDeltaPlayerFields };
