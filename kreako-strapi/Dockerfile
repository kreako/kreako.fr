FROM strapi/base

WORKDIR /srv/app

COPY ./package.json ./

RUN npm install

RUN rm -rf api build config extensions public
COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]