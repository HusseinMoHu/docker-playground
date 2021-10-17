# First stage to generate build directory for react
# <npm install> is needed to can use <npm run build>
# from all of this stage take ONLY build directory, and use in the next stage
FROM node:alpine AS build-stage
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
