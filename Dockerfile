FROM node:20.18.3-alpine3.20
WORKDIR /bot
COPY package*.json /bot/
RUN npm i \
    && apk update \
    && apk add vim curl
COPY . . 
EXPOSE 3000
CMD npm start