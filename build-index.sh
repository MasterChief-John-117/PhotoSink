#!/bin/bash

if [ -d web/live/albums ]
then
        python3 scanner/scanner.py web/live/albums
else
        echo "Please run build-web.sh and put photos in web/live/albums before running this"
fi
