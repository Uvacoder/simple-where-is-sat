FROM alpine AS build-stage

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY ./package.json .

RUN apk add --no-cache nodejs npm

RUN npm install

COPY . .

RUN adduser -D appuser

RUN chown -v appuser /usr/src/app

USER appuser

CMD ["npm", "start"]