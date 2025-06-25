#!/bin/bash

# Variables
SOURCE_DIR="$HOME/clock"
TARGET_DIR="/var/www/clock"
CURRENT_DIR="./current"
ARCHIVE_DIR="./previous"

# Ensure the archive and current directories exist
mkdir -p "$ARCHIVE_DIR"
mkdir -p "$CURRENT_DIR"

# Get the current timestamp for the archive name
TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")
ARCHIVE_SUBDIR="$ARCHIVE_DIR/clock-$TIMESTAMP"

echo "Starting clock files update process..."

# Step 1: Archive the current files
if [ -d "$TARGET_DIR" ] && [ "$(ls -A $TARGET_DIR 2>/dev/null)" ]; then
    echo "Archiving current clock files to $ARCHIVE_SUBDIR..."
    mkdir -p "$ARCHIVE_SUBDIR"
    cp -r "$TARGET_DIR"/* "$ARCHIVE_SUBDIR/"
    
    # Also update the current directory
    echo "Updating current directory copy..."
    rm -rf "$CURRENT_DIR"/*
    cp -r "$TARGET_DIR"/* "$CURRENT_DIR/"
else
    echo "Warning: No existing files found in $TARGET_DIR. Skipping archive step."
fi

# Step 2: Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory $SOURCE_DIR does not exist."
    exit 1
fi

if [ ! "$(ls -A $SOURCE_DIR 2>/dev/null)" ]; then
    echo "Error: Source directory $SOURCE_DIR is empty."
    exit 1
fi

# Step 3: Create target directory if it doesn't exist
echo "Ensuring target directory exists..."
sudo mkdir -p "$TARGET_DIR"

# Step 4: Copy files from source to target
echo "Copying files from $SOURCE_DIR to $TARGET_DIR..."
sudo cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"

# Step 5: Set proper ownership and permissions
echo "Setting proper ownership and permissions..."
sudo chown -R caddy:caddy "$TARGET_DIR"
sudo chmod -R 644 "$TARGET_DIR"/*
sudo chmod 755 "$TARGET_DIR"

# Step 6: List the files that were copied
echo "Files successfully copied to $TARGET_DIR:"
ls -la "$TARGET_DIR"

# Step 7: Test the clock endpoint
echo "Testing clock endpoint..."
CLOCK_URL="https://clock.endframe.net/"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$CLOCK_URL" 2>/dev/null)

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "302" ]; then
    echo "✓ Clock endpoint is responding (HTTP $HTTP_STATUS)"
else
    echo "⚠ Warning: Clock endpoint returned HTTP $HTTP_STATUS"
    echo "You may want to check the deployment manually."
fi

echo "Clock files update process completed successfully."
echo ""
echo "Files deployed:"
echo "- Main clock: https://clock.endframe.net/"
echo "- Config page: https://clock.endframe.net/config"