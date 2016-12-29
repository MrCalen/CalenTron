#! /bin/sh

rm -rf backend-src/node_modules
docker stop $(docker ps -a -q)
docker-compose build
docker-compose up -d