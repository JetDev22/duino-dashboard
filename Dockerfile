FROM node:22-alpine

WORKDIR /duino-dashboard/

COPY public/ /duino-dashboard/public
COPY src/ /duino-dashboard/src
COPY package.json /duino-dashboard/

RUN npm install

RUN npm install axios

CMD ["npm", "start"]
