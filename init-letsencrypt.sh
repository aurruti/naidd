#!/bin/bash

# Load .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

domains=(aurruti.cat www.aurruti.cat)
email=${EMAIL}
staging=0 # Set to 1 for test certificate, 0 for production

# Create the necessary directory structure
mkdir -p certbot/conf/live/aurruti.cat
mkdir -p certbot/www

# Create temporary self-signed certificate
openssl req -x509 -nodes -newkey rsa:4096 -days 1 \
    -keyout 'certbot/conf/live/aurruti.cat/privkey.pem' \
    -out 'certbot/conf/live/aurruti.cat/fullchain.pem' \
    -subj '/CN=localhost'

# Start nginx
docker-compose up --force-recreate -d nginx-proxy

# Wait for nginx to start
sleep 5

# Get the certificate
docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
    --email ${email} \
    $([ $staging = 1 ] && echo '--staging') \
    $(printf -- '-d %s ' "${domains[@]}") \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal" certbot

# Reload nginx
docker-compose exec nginx-proxy nginx -s reload