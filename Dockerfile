
ARG NODE_VERSION=23.6.0

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm", "start"]
