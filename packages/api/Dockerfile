# This docker file is used to build the image for the api package at the moment
# Maybe in future, we rename this to Dockerfile.api
FROM node:14
LABEL AUTHOR="Gbenga Anifowoshe <daveanifowoshe@gmail.com>"

COPY ./yarn.lock /app/
COPY ./packages/api/package.json /app/packages/api/

WORKDIR /app

RUN yarn install
COPY ./ /app

WORKDIR /app/packages/api
CMD yarn dev