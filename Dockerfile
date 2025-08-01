FROM node:18-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start:dev"]
