FROM node:20-alpine3.20 as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20-alpine3.20
RUN addgroup -S solderetusergroup && adduser -S builduser -G solderetusergroup
USER builduser
WORKDIR /usr/app
COPY --from=build /app/src/dist/solderet/ ./
CMD node server/server.mjs
EXPOSE 9321