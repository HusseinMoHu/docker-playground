# Specify the base image
FROM node:alpine

# Specify project directory inside the container
WORKDIR /usr/src/app

# Install some dependencies
# A wildcard is used to ensure both package.json AND project files are copied
COPY ./ ./
RUN npm install


# Default command
CMD [ "npm", "start" ]