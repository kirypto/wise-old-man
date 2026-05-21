-- Denormalize player filter fields onto cachedDeltas for fast leaderboard queries.

ALTER TABLE "cachedDeltas"
  ADD COLUMN "playerBuild" "player_build",
  ADD COLUMN "playerType" "player_type",
  ADD COLUMN "playerCountry" "country",
  ADD COLUMN "playerStatus" "player_status";

UPDATE "cachedDeltas" cd
SET
  "playerBuild" = p."build",
  "playerType" = p."type",
  "playerCountry" = p."country",
  "playerStatus" = p."status"
FROM "players" p
WHERE cd."playerId" = p."id";

ALTER TABLE "cachedDeltas"
  ALTER COLUMN "playerBuild" SET NOT NULL,
  ALTER COLUMN "playerType" SET NOT NULL,
  ALTER COLUMN "playerStatus" SET NOT NULL;

CREATE INDEX "cached_deltas_leaderboard"
  ON "cachedDeltas" ("period", "metric", "playerStatus", "playerBuild", "value" DESC, "updatedAt" ASC);
