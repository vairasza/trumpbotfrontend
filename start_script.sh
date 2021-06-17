#!/bin/zsh
APP_NAME="trumpbot_website"

OLD_ID=$(docker ps -qaf "name=$APP_NAME")
if [ ! -z $OLD_ID ];
then docker stop $OLD_ID;
fi

REMOVEABLE_IMAGES=$(docker images --filter dangling=true -q)
if [ ! -z $REMOVEABLE_IMAGES ];
then docker rmi $REMOVEABLE_IMAGES -f;
fi

docker build --rm -t $APP_NAME .
IMAGE_ID=$(docker images -q $APP_NAME)
docker run --rm -d -p 8001:8001 --name $APP_NAME $IMAGE_ID