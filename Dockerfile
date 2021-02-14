FROM node:12-alpine

RUN npm install
RUN npm install -g http-server
RUN npm install --save node-sass sass-loader

WORKDIR /english-project

COPY package*.json ./

COPY . .
RUN npm run build

EXPOSE 8080
CMD ["http-server", "dist"]