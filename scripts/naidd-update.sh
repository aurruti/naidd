#!/bin/bash
echo "$(date) Running naidd-update.sh." >> /scripts/naidd-update.log

# Assumes update.sh is in the repo root or nearby
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the repository root
cd "$SCRIPT_DIR" || exit 1

## NOTE: the current script is NOT efficient: it is pulling constantly.
## It is better to use a webhook to trigger the update. But that is a problem for future me.
## A temp solution is this one, or even one where the diff is checked before actually merging.

# Pull from repo (no access token needed)
git pull origin main

# (WIP) Check if changes require a rebuild
if git diff --quiet HEAD Dockerfile package.json; then
    echo "No changes to Dockerfile and/or package.json, skipping rebuild."  >> /scripts/naidd-update.log
else
    echo "Changes detected in Dockerfile and/or package.json, rebuilding."  >> /scripts/naidd-update.log
    docker-compose build
    echo "Restarting containers."  >> /scripts/naidd-update.log
    docker-compose restart
    echo "Restart success."  >> /scripts/naidd-update.log
fi