FROM node:10.11.0-alpine

WORKDIR /app

ENV HOME /app

COPY package.json yarn.lock ./

RUN yarn
