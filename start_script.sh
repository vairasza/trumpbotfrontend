#!/bin/zsh

APP_NAME="trumpbot_website"

#stop container that is already running with same name
OLD_ID=$(docker ps -qaf "name=trumpbotwebsite")
if [ -z $OLD_ID ];
then docker stop $OLD_ID;
fi

#remove images that are not necessary
REMOVEABLE_IMAGES=$(docker images --filter dangling=true -q)
docker rmi $REMOVEABLE_IMAGES -f

docker build --rm -t $APP_NAME .
IMAGE_ID=$(docker images -q $APP_NAME)
docker run --rm -d -p 8001:8001 --name $APP_NAME $IMAGE_ID