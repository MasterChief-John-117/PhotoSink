#!/bin/bash

cd web/
mkdir -p live/albums
npm install
npm run build
cp build/* live/ -r
