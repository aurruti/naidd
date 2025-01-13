#!/bin/bash
set -e  # Exit on any error

# Load .env
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    exit 1
fi
source .env

# Check EMAIL
if [ -z "$EMAIL" ]; then
    echo "Error: EMAIL not set in .env file!"
    exit 1
fi

# Create directories
echo "Creating directories..."
mkdir -p certbot/conf
mkdir -p certbot/www
mkdir -p nginx/conf.d

# Check if certificates already exist
if [ -d "certbot/conf/live/naidd.duckdns.org" ]; then
    echo "Certificates already exist. Skipping certificate generation."
    echo "Restarting services..."
else
    echo "Setting up initial configuration..."
    # Start nginx first with HTTP-only config
    docker-compose up -d nginx-proxy website

    echo "Waiting for nginx to start..."
    sleep 30

    echo "Generating initial SSL certificate..."
    docker-compose run --rm certbot certonly --webroot \
        --webroot-path /var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d naidd.duckdns.org

    echo "Restarting services with HTTPS configuration..."
fi

# Start the services
docker-compose down
docker-compose up -d

echo "Complete!"