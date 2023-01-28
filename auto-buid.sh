#/bin/bash

while true; do
    git fetch origin master
    git diff --quiet origin/master

    if [ $? -ne 0 ]; then
        echo "There are changes, pull and build"
        git pull origin master
        yarn
        yarn update-sdk
        yarn build
    else
        echo "No changes, do nothing"
    fi
    sleep 300
done
