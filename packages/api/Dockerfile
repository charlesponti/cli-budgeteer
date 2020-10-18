FROM node:carbon-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

CMD ["npm", "start"]

