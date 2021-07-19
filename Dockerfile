FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install
COPY . .
COPY ./dist .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]