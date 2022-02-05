FROM node:12.16.3
WORKDIR /code
COPY package.json /code/package.json
RUN npm install
COPY . /code
RUN npm run build
CMD [ "npm", "run", "start" ]
