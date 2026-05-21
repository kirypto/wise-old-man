#!/usr/bin/env pwsh

# Setup the docker dependencies (Postgres, PGAdmin and Redis)
docker-compose up --build -d

# Migrate the development database.
# This will remove any data from it and apply any missing migrations
prisma migrate dev

# Run ts-node-dev on the dev server and keep the process alive, restarting when the code changes
$env:NODE_ENV = "development"
$env:SERVER_TYPE = "dev"

ts-node-dev --poll --exit-child --respawn --transpile-only --ignore-watch node_modules src/entrypoints/dev.server.ts