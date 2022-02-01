### STAGE 1: Build ###
FROM node:12.22.1-alpine3.10 AS build
WORKDIR /app
ENV PATH=${PATH}:./node_modules/.bin
ENV NODE_PATH=/usr/src/app/node_modules
ADD package.json .
ADD package-lock.json .
RUN npm install
RUN ngcc
ADD . .
RUN npm run build:smr-chat

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /app/apps/smr-chat/smr-chat-ui/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/apps/smr-chat /usr/share/nginx/html

# docker build -f ./apps/smr-chat/Dockerfile . -t smr-chat-ui:1.0.0
# docker run --name c-smr-chat-ui -d -p 80:8080 --env-file .env smr-chat-ui:1.0.0
# docker exec -it ms-life_ui_1 /bin/bash
# docker rm -f c-smr-chat-ui
# docker ( to debug run without -d  (outside shell))
# Docker registry ovh management:
# docker build -f ./apps/backend/api/Dockerfile . --tag 9g3r4dt6.gra7.container-registry.ovh.net/private/smr-chat-api:1.0.0
# docker login 9g3r4dt6.gra7.container-registry.ovh.net
# docker push 9g3r4dt6.gra7.container-registry.ovh.net/private/smr-chat-api:1.0.0 
#EXPOSE 80
#FROM scratch