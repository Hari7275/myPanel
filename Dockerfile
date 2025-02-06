FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm i -g pm2


CMD ["npm", "run", "start:prod"]
