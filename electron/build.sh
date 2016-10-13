#! /bin/sh

set -e

APP=/Applications/calen.app

rm -rf $APP
echo "Fetching electron node dependencies"
npm install
echo "Fetching application node dependencies"
tmp=$(cd views && npm install)
echo "Fetching bower dependencies"
bower install

electron-packager ./ --platform=darwin --arch=x64 --overwrite
cp -r ./calen-darwin-x64/calen.app $APP
