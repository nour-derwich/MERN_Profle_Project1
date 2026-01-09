#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."
# Wait for PostgreSQL (max 30 seconds)
timeout=30
while ! nc -z postgres 5432; do
  timeout=$((timeout - 1))
  if [ $timeout -le 0 ]; then
    echo "PostgreSQL is not available - timed out"
    exit 1
  fi
  echo "Waiting for PostgreSQL... ($timeout seconds remaining)"
  sleep 1
done

echo "PostgreSQL is ready!"

# Run database setup commands
echo "Setting up database..."
npm run db:fresh

# Run the main command
exec "$@"