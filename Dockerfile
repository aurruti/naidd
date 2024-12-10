# Use an official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose the port the server runs on
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]
