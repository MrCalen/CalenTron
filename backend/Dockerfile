FROM node:argon

RUN mkdir -p /var/www/calentron
WORKDIR /var/www/calentron

COPY . /var/www/calentron

RUN npm install
EXPOSE 3000

RUN node migrate.js

ENTRYPOINT [ "npm", "run", "start" ]

CMD []
