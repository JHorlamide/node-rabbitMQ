FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 9090

CMD ["npm", "start"]
