FROM node:10.11.0-alpine AS storestatic

RUN apk add --update bash

ENV REACT_APP_CONFIG PROD
WORKDIR /usr/src/react-app

COPY app/package.json app/yarn.lock ./
RUN yarn --pure-lockfile

COPY app/public ./public
COPY app/src ./src

RUN yarn run build

FROM nginx:1.13.9-alpine

ENV HOME /app
WORKDIR /app

COPY --from=storestatic /usr/src/react-app/build/ ./

CMD ["nginx", "-g", "daemon off;"]
