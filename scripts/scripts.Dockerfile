FROM node:20

# Dependencies for scripts
RUN apt-get update
RUN apt-get install -y \
    git \
    cron \
    curl

# Install Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

WORKDIR /scripts

# Copies
COPY . /scripts

# Scripts running and crontab
RUN chmod +x *.sh
RUN find /scripts -name "*.sh" -exec sh -c 'echo "32 * * * * {}" > /etc/cron.d/$(basename {}).job' \;
RUN chmod 0644 /etc/cron.d/*.job
RUN find /etc/cron.d -name "*.job" -exec crontab {} \;

# Ensure log directory exists and is writable
RUN mkdir -p /scripts/logs
RUN chmod 777 /scripts/logs

# Command to run the server
CMD ["sh", "-c", "cron && tail -f /dev/null"]
