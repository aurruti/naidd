#!/bin/bash

# File structure: naidd-update is in root-repo/scripts/
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="${SCRIPT_DIR}/logs/naidd-update.log"
DOCKER_COMPOSE_FILE="${REPO_ROOT}/docker-compose.yml"
echo "$(date) Running naidd-update.sh." >> "$LOG_FILE"

# Correctly set Git environment
export GIT_DIR="${REPO_ROOT}/.git"
export GIT_WORK_TREE="${REPO_ROOT}"

# .git directory is given by enviornment variable
if [ -z "$GIT_DIR" ] || [ -z "$GIT_WORK_TREE" ]; then
    echo "Error in setting git environment." >> "$LOG_FILE"
    exit 1
fi

## NOTE: the current script is NOT efficient: it is pulling constantly.
## It is better to use a webhook to trigger the update. But that is a problem for future me.
## A temp solution is this one; which the diff is checked before actually merging and restarting containers.

# Fetch from repo (no access token needed)
git fetch origin main || { echo "Failed to fetch from origin main." >> "$LOG_FILE"; exit 1; }

# Are changes significant?
if git diff --quiet HEAD origin/main -- '*.Dockerfile' '*/package.json' 'docker-compose.yml'; then
    git pull origin main || { echo "Failed to pull from origin main." >> "$LOG_FILE"; exit 1; }
    if ! docker-compose -f "$DOCKER_COMPOSE_FILE" ps -q | grep -q .; then
        echo "No significant changes; but there are no containers running! Building and starting containers." >> "$LOG_FILE"
        docker-compose -f "$DOCKER_COMPOSE_FILE" pull || { echo "Failed to pull new images." >> "$LOG_FILE"; exit 1; }
        docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache || { echo "Failed to build containers." >> "$LOG_FILE"; exit 1; }
        docker-compose -f "$DOCKER_COMPOSE_FILE" up -d || { echo "Failed to start containers." >> "$LOG_FILE"; exit 1; }
        docker image prune -f || echo "Failed to cleanup images." >> "$LOG_FILE"
    else
        echo "No significant changes, skipping rebuild." >> "$LOG_FILE"
    fi

    exit 0
fi

git pull origin main || { echo "Failed to pull from origin main." >> "$LOG_FILE"; exit 1; }
echo "Changes detected, starting deployment process." >> "$LOG_FILE"

# TO-DO Backup current container list for potential rollback
# docker-compose ps -q | xargs docker inspect --format='{{.Name}}' > previous_containers.txt 

# Pull and build
docker-compose -f "$DOCKER_COMPOSE_FILE" pull || { echo "Failed to pull new images." >> "$LOG_FILE"; exit 1; }
docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache || { echo "Failed to build containers." >> "$LOG_FILE"; exit 1; }

# Deploy
echo "Stopping and removing old containers." >> "$LOG_FILE"
docker-compose -f "$DOCKER_COMPOSE_FILE" stop || { echo "Failed to stop containers." >> "$LOG_FILE"; exit 1; }
docker-compose -f "$DOCKER_COMPOSE_FILE" rm -f || { echo "Failed to remove old containers." >> "$LOG_FILE"; exit 1; }

echo "Starting new containers." >> "$LOG_FILE"
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d || { echo "Failed to deploy new containers." >> "$LOG_FILE"; exit 1; }

# TO-DO Health check
# sleep 10  # Give containers time to start
# docker-compose ps
# docker-compose ps | grep -q '(healthy)' || { echo "Containers not healthy" >> "$LOG_FILE"; exit 1; }

# Cleanup
docker image prune -f || echo "Failed to cleanup images." >> "$LOG_FILE" 
echo "Deployment successful." >> "$LOG_FILE"