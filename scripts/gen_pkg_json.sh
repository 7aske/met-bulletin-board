#!/usr/bin/env sh

PACKAGE_JSON='{
  "name": "met-bulletin-board",
  "version": "1.0.0",
  "main": "app.js",
  "description": "Simple bulletin board application for showing content over an Electron based interface window",
  "scripts": {
    "start": "DISPLAY=:0 ./node_modules/.bin/electron ./app.js"
  },
  "author": "Nikola Tasic, Aleksandar Stojadinovic",
  "homepage": "https://github.com/7aske/met-bulletin-board#readme",
  "dependencies": {
    "electron": "6.1.7",
    "body-parser": "^1.19.0",
    "bootstrap": "^4.3.1",
    "cookie-parser": "^1.4.4",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "express": "^4.16.4",
    "jquery": "^3.4.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.8.7",
    "morgan": "^1.9.1",
    "nodemon": "^1.19.4",
    "popper.js": "^1.15.0",
    "shortid": "^2.2.14"
  }
}'
PACKAGE_JSON_PATH='dist/package.json'
if [ ! -d "dist" ]; then
  mkdir "dist"
fi
[ -f "$PACKAGE_JSON_PATH" ] || echo "$PACKAGE_JSON" >"$PACKAGE_JSON_PATH"
