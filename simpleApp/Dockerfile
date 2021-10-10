# Specify the base image
FROM node:alpine

# Specify project directory inside the container
WORKDIR /usr/src/app

# Install some dependencies
# A wildcard is used to ensure both package.json AND project files are copied
# Sperated COPY command to ensure <npm install> run ONLY when we chaging package.json
COPY ./package.json ./
RUN npm install
COPY ./ ./


# Default command
CMD [ "npm", "start" ]