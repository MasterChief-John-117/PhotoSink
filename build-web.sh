#!/bin/bash

cd web/
mkdir -p live/albums
npm run build
cp build/* live/ -r