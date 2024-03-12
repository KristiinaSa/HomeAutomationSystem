# ./backend/Dockerfile

# Use official Node.js runtime as a parent image
FROM node:20.11.1-alpine3.19

# Set the working directory in the container to /app
WORKDIR /app

RUN apk add --no-cache bash

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the working directory
COPY . .

# Install wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD /wait-for-it.sh mariadb:3306 -- node db/createTables.js && node db/addData.js && npm start