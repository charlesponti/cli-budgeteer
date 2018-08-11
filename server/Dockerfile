FROM node:carbon-alpine

RUN npm i npm@latest -g

COPY package.json .

RUN npm install

COPY . .

ARG NODE_ENV
ENV NODE_ENV production

CMD ["npm", "start"]

