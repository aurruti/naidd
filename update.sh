#!/bin/bash

# Assumes update.sh is in the repo root or nearby
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the repository root
cd "$SCRIPT_DIR" || exit 1

# Pull from repo
echo "Updating repository in $SCRIPT_DIR"
git fetch --all
git reset --hard origin/main
git clean -fd

# WIP: Further actions after each update
echo "Repository updated successfully!"

### chmod +x update.sh
### ./update.sh