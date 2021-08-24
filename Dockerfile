FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install

COPY . .
RUN npm i typescript -g
RUN tsc
RUN ls | grep -v 'dist' | grep -v 'node_modules' | xargs rm -rf
CMD [ "node", "./dist/app.js" ]