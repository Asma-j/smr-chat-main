### STAGE 1: Build ###
FROM node:12.22.1-alpine3.10 AS build
WORKDIR /app
ADD package.json .
ADD package-lock.json .
RUN npm install 
ADD . .
RUN npm run build:smr-chat-api 
### STAGE 2: run in production ###
FROM node:12.22.1-alpine3.10 as production
WORKDIR /app
ADD package.json .
ADD package-lock.json .
RUN npm install --only=production
ADD . .
COPY --from=build /app/dist/ ./dist
CMD node -r dotenv/config /app/dist/apps/backend/api-smr-chat/main.js 
