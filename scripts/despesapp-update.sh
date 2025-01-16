#!/bin/bash

# File structure: despesapp-update is in root-repo/scripts/
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
LOG_FILE="${SCRIPT_DIR}/logs/despesapp-update.log"
DOCKER_COMPOSE_FILE="${REPO_ROOT}/docker-compose.yml"
echo "$(date) Running despesapp-update.sh." >> "$LOG_FILE"

# Correctly set Git environment -> this is a subrepo, meaning the .git directory is actually in root-repo/despesapp/
export GIT_DIR="${REPO_ROOT}/despesapp/.git"
export GIT_WORK_TREE="${REPO_ROOT}/despesapp"

# .git directory is given by enviornment variable
if [ -z "$GIT_DIR" ] || [ -z "$GIT_WORK_TREE" ]; then
    echo "Error in setting git environment." >> "$LOG_FILE"
    exit 1
fi

## NOTE: the current script is NOT efficient: it is fetching constantly.
## It is better to use a webhook to trigger the update. But that is a problem for future me.
## A temp solution is this one; which the diff is checked before actually merging and restarting containers.

# Fetch from repo (no access token needed)
git fetch origin main || { echo "Failed to fetch from origin main." >> "$LOG_FILE"; exit 1; }

# Are changes significant?
if git diff --quiet HEAD origin/main; then
    if ! docker-compose -f "$DOCKER_COMPOSE_FILE" ps -q | grep -q .; then
        echo "No changes to pull; but there are no containers running! Building and starting containers." >> "$LOG_FILE"
        docker-compose -f "$DOCKER_COMPOSE_FILE" pull || { echo "Failed to pull new images." >> "$LOG_FILE"; exit 1; }
        docker-compose -f "$DOCKER_COMPOSE_FILE" build || { echo "Failed to build containers." >> "$LOG_FILE"; exit 1; }
        docker-compose -f "$DOCKER_COMPOSE_FILE" up -d || { echo "Failed to start containers." >> "$LOG_FILE"; exit 1; }
        docker image prune -f || echo "Failed to cleanup images." >> "$LOG_FILE"
        echo "Deployment successful." >> "$LOG_FILE"
    else
        echo "No changes to pull, skipping rebuild." >> "$LOG_FILE"
    fi

    exit 0
fi

git pull origin main || { echo "Failed to pull from origin main." >> "$LOG_FILE"; exit 1; }
echo "Changes detected, starting redeployment process." >> "$LOG_FILE"

# TO-DO Backup current container list for potential rollback
# docker-compose ps -q | xargs docker inspect --format='{{.Name}}' > previous_containers.txt 

# Pull and build
docker-compose -f "$DOCKER_COMPOSE_FILE" pull despesapp || { echo "Failed to pull despesapp image." >> "$LOG_FILE"; exit 1; }
docker-compose -f "$DOCKER_COMPOSE_FILE" build despesapp || { echo "Failed to build despesapp container." >> "$LOG_FILE"; exit 1; }

# Deploy
echo "Stopping and removing old containers." >> "$LOG_FILE"
docker-compose -f "$DOCKER_COMPOSE_FILE" stop despesapp || { echo "Failed to stop despesapp container." >> "$LOG_FILE"; exit 1; }
docker-compose -f "$DOCKER_COMPOSE_FILE" rm -f despesapp || { echo "Failed to remove despesapp container." >> "$LOG_FILE"; exit 1; }

echo "Starting new containers." >> "$LOG_FILE"
docker-compose -f "$DOCKER_COMPOSE_FILE" up -d despesapp || { echo "Failed to deploy new despesapp container." >> "$LOG_FILE"; exit 1; }

# TO-DO Health check
# sleep 10  # Give containers time to start
# docker-compose ps
# docker-compose ps | grep -q '(healthy)' || { echo "Containers not healthy" >> "$LOG_FILE"; exit 1; }

# Cleanup
docker image prune -f || echo "Failed to cleanup images." >> "$LOG_FILE"
echo "Deployment successful." >> "$LOG_FILE"