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

psql "sslmode=verify-full \
    sslrootcert=$CERT_PATH \
    host=$DB_HOST \
    dbname=$DB_DATABASE \
    user=$DB_USERNAME \
    password=$DB_PASSWORD"
