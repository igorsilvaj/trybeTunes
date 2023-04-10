FROM node:16.19.1-alpine3.17 as trybetunes
WORKDIR /app
COPY package.json .
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]