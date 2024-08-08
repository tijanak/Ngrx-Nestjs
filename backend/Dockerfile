FROM node:18.17.0-alpine


WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]

RUN npm install --production

COPY . .

RUN npm install -g @angular/cli 
RUN npm i nx@19.5.6
RUN npx nx build backend --prod
RUN npx nx reset
CMD npx nx serve backend