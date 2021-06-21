# Frontend for Trumpbot

![Deploy Trumpbot Website](https://github.com/vairasza/trumpbot_website/actions/workflows/deploy.yml/badge.svg)

## Backend for Trumpbot
[Link](https://github.com/vairasza/trumpbot_lambda)

## Installation with Docker >= 20.10

```
  APP_NAME="trumpbot_website" &&
  git clone https://github.com/vairasza/trumpbot_website.git &&
  cd ./trumpbot_website &&
  docker build --rm -t $APP_NAME . &&
  docker run --rm -d -p $EXTERNAL_PORT:8001 --name $APP_NAME $IMAGE_ID
  
```

## Installation with NodeJS >=16.3
(port is 8001 by default; can be changed in server.js)

```
  git clone https://github.com/vairasza/trumpbot_website.git &&
  cd ./trumpbot_website &&
  npm run start
  
```
