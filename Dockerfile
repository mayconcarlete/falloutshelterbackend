FROM node:12 as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

RUN ls

FROM node:12

WORKDIR /app

COPY --from=build '/app/dist' /app
COPY --from=build '/app/package.json' /app/
COPY --from=build '/app/package-lock.json' /app/

RUN ls -a

RUN npm install --only=prod
