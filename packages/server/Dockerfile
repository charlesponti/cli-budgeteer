FROM node:carbon-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ARG NODE_ENV
ENV NODE_ENV production

CMD ["npm", "start"]

