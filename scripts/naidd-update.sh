#!/bin/bash

LOG_FILE="/scripts/logs/naidd-update.log"
echo "$(date) Running naidd-update.sh." >> "$LOG_FILE"

# Locate the .git directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -d "$SCRIPT_DIR/.git" ]; then
    GIT_DIR="$SCRIPT_DIR/.git"
elif [ -d "/scripts/.git" ]; then
    GIT_DIR="/scripts/.git"
elif [ -d "$SCRIPT_DIR/../.git" ]; then
    GIT_DIR="$SCRIPT_DIR/../.git"
else
    echo "$(date) .git directory not found." >> "$LOG_FILE"
    exit 1
fi

# Set Git to use the located .git directory
export GIT_DIR="$GIT_DIR"
export GIT_WORK_TREE="$SCRIPT_DIR"


## NOTE: the current script is NOT efficient: it is pulling constantly.
## It is better to use a webhook to trigger the update. But that is a problem for future me.
## A temp solution is this one, or even one where the diff is checked before actually merging.

# Pull from repo (no access token needed)
git pull origin main || { echo "Failed to pull from origin main." >> "$LOG_FILE"; exit 1; }

# (WIP) Check if changes require a rebuild
if git diff --quiet HEAD -- '*.Dockerfile' '*/package.json'; then
    echo "No changes to any .Dockerfile or package.json, skipping rebuild."  >> "$LOG_FILE"
else
    echo "Changes detected in Dockerfile and/or package.json, rebuilding."  >> "$LOG_FILE"
    docker-compose build || { echo "Failed to build containers." >> "$LOG_FILE"; exit 1; }
    echo "Restarting containers."  >> "$LOG_FILE"
    docker-compose restart || { echo "Failed to restart containers." >> "$LOG_FILE"; exit 1; }
    echo "Restart success."  >> "$LOG_FILE"
fi
