FROM node:lts-alpine

ENV PORT=4100
ENV APP="backend"
EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install --production

COPY . .

RUN npm install -g @angular/cli 
RUN npm i nx@19.5.6
RUN npx nx build ${APP} --prod
RUN npx nx reset
CMD npx nx serve ${APP}