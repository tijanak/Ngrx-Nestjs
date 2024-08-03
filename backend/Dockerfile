# BUILD

FROM node:16.11.1-slim as build

WORKDIR /app/workspace

COPY ../ app/workspace

RUN npm install -g nx@latest && \
    npm install && \nx build backend


# SERVE

FROM node:16.11.1-slim

WORKDIR /app/backend

COPY --from=build /app/nx/dist/backend /app/backend

EXPOSE 3333
CMD ["nx", "serve","backend"]
