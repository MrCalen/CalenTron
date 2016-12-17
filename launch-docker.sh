#!/usr/bin/env bash

echo "Host mr-calen.eu" >> ~/.ssh/config
echo "    StrictHostKeyChecking no" >> ~/.ssh/config

sed -i -e "s/HIDDEN_PING/${PING_URL}/g" docker/docker-compose.yml
sed -i -e "s@HIDDEN_CAH@${CAH_URL}@g" docker/docker-compose.yml
sed -i -e "s/HIDDEN_WEATHER/${WEATHER_KEY}/g" docker/docker-compose.yml

rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/ ci@mr-calen.eu:/home/ci/calentron
ssh ci@mr-calen.eu 'cd /home/ci/calentron/docker && sh start.sh &'