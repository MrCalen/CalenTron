FROM node:argon

RUN mkdir -p /var/www/calentron
WORKDIR /var/www/calentron

COPY ./backend-src /var/www/calentron/

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]

CMD []
