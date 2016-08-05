#! /bin/sh

set -e

APP=/Applications/calen.app

rm -rf $APP
electron-packager ./ --platform=darwin --arch=x64 --overwrite
mv ./calen-darwin-x64/calen.app $APP