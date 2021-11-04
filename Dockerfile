FROM node:14-alpine

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN adduser -D appuser

RUN chown -v appuser /usr/src/app

USER appuser

CMD ["npm", "start"]