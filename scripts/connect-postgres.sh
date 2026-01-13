#!/bin/bash

echo "Connecting to Supabase PostgreSQL..."
psql --version

source "$(dirname "$0")/../.env"

# Map environment variables
DB_HOST=$SUPABASE_DB_HOST
DB_USERNAME=$SUPABASE_DB_USERNAME
DB_DATABASE=$SUPABASE_DB_DATABASE
DB_PASSWORD=$SUPABASE_DB_PASSWORD

CERT_PATH="$(dirname "$0")/../artifacts/supabase/prod-supabase.crt"

# Verify certificate exists
if [ ! -f "$CERT_PATH" ]; then
    echo "Error: Certificate file not found at $CERT_PATH"
    exit 1
fi

echo "Certificate found: $CERT_PATH"
echo "Connecting to: $DB_HOST"
echo "Database: $DB_DATABASE"
echo "Username: $DB_USERNAME"
echo ""

# Use URI format which handles special characters better
# URL-encode the password if needed
export PGPASSWORD="$DB_PASSWORD"
export PGSSLMODE=verify-full
export PGSSLROOTCERT="$CERT_PATH"

psql -h "$DB_HOST" -U "$DB_USERNAME" -d "$DB_DATABASE" -p 5432
