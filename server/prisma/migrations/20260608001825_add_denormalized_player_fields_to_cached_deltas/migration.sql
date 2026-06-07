/*
  Warnings:

  - Added the required column `playerBuild` to the `cachedDeltas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerStatus` to the `cachedDeltas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerType` to the `cachedDeltas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."cachedDeltas" ADD COLUMN     "playerBuild" "public"."player_build" NOT NULL,
ADD COLUMN     "playerCountry" "public"."country",
ADD COLUMN     "playerStatus" "public"."player_status" NOT NULL,
ADD COLUMN     "playerType" "public"."player_type" NOT NULL;

-- CreateIndex
CREATE INDEX "cached_deltas_leaderboard" ON "public"."cachedDeltas"("period", "metric", "playerStatus", "playerBuild", "value" DESC, "updatedAt" ASC);
