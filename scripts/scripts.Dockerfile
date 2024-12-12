FROM node:20
WORKDIR /scripts

# Copies
COPY . /scripts

# Dependencies for scripts
RUN apt-get update && apt-get install -y cron

# Scripts running and crontab
RUN chmod +x *.sh
RUN find /scripts -name "*.sh" -exec sh -c 'echo "32 * * * * {}" > /etc/cron.d/$(basename {}).job' \;
RUN chmod 0644 /etc/cron.d/*.job
RUN find /etc/cron.d -name "*.job" -exec crontab {} \;


# Command to run the server
CMD ["sh", "-c", "cron && tail -f /dev/null"]
