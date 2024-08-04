FROM node:lts-alpine

ENV PORT=4100
ENV APP="backend"
EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ["package*.json", "nx.json", "./"]
# COPY nx.json .

RUN npm install --production

COPY . .

RUN npm install -g @angular/cli 
RUN npm install -g @nrwl/cli@12.0.1

RUN nx build --prod
CMD ["nx", "serve" ,APP]