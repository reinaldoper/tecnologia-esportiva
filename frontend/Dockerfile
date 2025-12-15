# Usa Node.js LTS
FROM node:20-alpine

WORKDIR /appfrontend


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD ["npm", "run", "dev"]
