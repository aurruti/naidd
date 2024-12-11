# Use an official Node.js image
FROM node:20

# Default (WIP)
WORKDIR /app

# Dependencies for scripts
RUN apt-get update && apt-get install -y cron

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copies
COPY . .
COPY ./scripts/update.sh /scripts/update.sh

# Scripts running
RUN chmod +x /scripts/update.sh
RUN echo "32 * * * * /scripts/update.sh" > /etc/cron.d/update-job
RUN chmod 0644 /etc/cron.d/update-job
RUN crontab /etc/cron.d/update-job


# Expose the port the server runs on
EXPOSE 3000

# Command to run the server
CMD cron && npm start
