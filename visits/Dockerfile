# Base image
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ./package*.json ./
RUN npm install

# Bundle app source
COPY ./ ./

# The command to run your app
CMD ["npm", "start"]