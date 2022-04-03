FROM node:16.9.0-alpine
WORKDIR /app
COPY package.json index.js /app/
RUN npm install -g nodemon
RUN npm install
CMD ["nodemon", "index.js"]
