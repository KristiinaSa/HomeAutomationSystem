# ./backend/Dockerfile

# Use official Node.js runtime as a parent image
FROM node:20.11.1-alpine3.19

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies, add bash, and remove unnecessary files
RUN apk add --no-cache bash && npm ci

# Copy the rest of the code to the working directory
COPY . .

# Install wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Define the command to run the app
CMD /wait-for-it.sh ${DB_HOST}:${DB_PORT} -- node db/createTables.js && node db/addData.js && npm start