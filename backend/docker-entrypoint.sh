#!/bin/sh

# Wait for PostgreSQL
echo "Waiting for PostgreSQL..."
./wait-for-db.sh postgres

# Run any database migrations
# (Add your migration commands here if needed)

# Start the application
echo "Starting backend server..."
exec npm start