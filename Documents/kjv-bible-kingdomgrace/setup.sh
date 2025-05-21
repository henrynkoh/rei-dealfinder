#!/bin/bash

# Create necessary directories
mkdir -p client/src/components
mkdir -p client/src/pages
mkdir -p server/config
mkdir -p server/routes
mkdir -p server/db/migrations

# Install dependencies
echo "Installing dependencies..."
npm run install:all

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/kjv_bible
CLIENT_URL=http://localhost:3000" > .env
fi

# Create PostgreSQL database
echo "Creating database..."
createdb kjv_bible

# Run database migrations
echo "Running database migrations..."
psql -d kjv_bible -f server/db/migrations/init.sql

echo "Setup complete! You can now run the application with: npm run dev:full" 