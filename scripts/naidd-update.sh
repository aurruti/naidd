#!/bin/bash

LOG_FILE="${LOG_DIR:-/scripts/logs}/naidd-update.log"
echo "$(date) Running naidd-update.sh." >> "$LOG_FILE"

# .git directory is given by enviornment variable
if [ -z "$GIT_DIR" ] || [ -z "$GIT_WORK_TREE" ]; then
    echo "Error in setting git environment." >> "$LOG_FILE"
    exit 1
fi

## NOTE: the current script is NOT efficient: it is pulling constantly.
## It is better to use a webhook to trigger the update. But that is a problem for future me.
## A temp solution is this one, or even one where the diff is checked before actually merging.

# Pull from repo (no access token needed)
git pull origin main || { echo "Failed to pull from origin main." >> "$LOG_FILE"; exit 1; }

# Are changes significant?
if git diff --quiet HEAD -- '*.Dockerfile' '*/package.json' 'docker-compose.yml'; then
    echo "No significant changes, skipping rebuild." >> "$LOG_FILE"
    exit 0
fi

echo "Changes detected, starting deployment process." >> "$LOG_FILE"

# TO-DO Backup current container list for potential rollback
# docker-compose ps -q | xargs docker inspect --format='{{.Name}}' > previous_containers.txt 

# Pull and build
docker-compose pull || { echo "Failed to pull new images." >> "$LOG_FILE"; exit 1; }
docker-compose build --no-cache || { echo "Failed to build containers." >> "$LOG_FILE"; exit 1; }

# Deploy
echo "Stopping and removing old containers." >> "$LOG_FILE"
docker-compose down --remove-orphans || { echo "Failed removal of old containers." >> "$LOG_FILE"; exit 1; }

echo "Starting new containers." >> "$LOG_FILE"
docker-compose up -d || { echo "Failed deployment of new containers." >> "$LOG_FILE"; exit 1; }

# TO-DO Health check
# sleep 10  # Give containers time to start
# docker-compose ps
# docker-compose ps | grep -q '(healthy)' || { echo "Containers not healthy" >> "$LOG_FILE"; exit 1; }

# Cleanup
docker image prune -f || echo "Failed to cleanup images." >> "$LOG_FILE" 
echo "Deployment successful." >> "$LOG_FILE"