FROM node:20.18-alpine3.20
WORKDIR /bot

COPY package*.json ./
RUN npm install \
    && apk update \
    && apk add vim curl
COPY . .
EXPOSE 3000
CMD npm start