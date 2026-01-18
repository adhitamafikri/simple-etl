#!/bin/bash

echo "Dumping production users from Supabase..."
supabase --version

source "$(dirname "$0")/../.env"

# Build database URL
DB_URL="postgresql://${SUPABASE_DB_USERNAME}:${SUPABASE_DB_PASSWORD}@${SUPABASE_DB_HOST}:5432/${SUPABASE_DB_DATABASE}"

# Create artifacts directory if it doesn't exist
ARTIFACTS_DIR="$(dirname "$0")/../artifacts/dumps"
mkdir -p "$ARTIFACTS_DIR"

# Generate timestamp for the dump file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DUMP_FILE="$ARTIFACTS_DIR/prod-users_$TIMESTAMP.sql"

echo "Connecting to: $SUPABASE_DB_HOST"
echo "Database: $SUPABASE_DB_DATABASE"
echo "Dumping users table to: $DUMP_FILE"
echo ""

# Dump the users table data using Supabase CLI
supabase db dump \
    --debug \
    --db-url "$DB_URL" \
    --table users > "$DUMP_FILE"

if [ $? -eq 0 ]; then
    echo "✓ Successfully dumped users to $DUMP_FILE"
    echo "File size: $(du -h "$DUMP_FILE" | cut -f1)"
else
    echo "✗ Failed to dump users"
    exit 1
fi
