FROM node:16

WORKDIR /app

COPY . .

RUN ls

RUN npm install