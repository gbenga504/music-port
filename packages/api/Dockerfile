FROM node:18
LABEL AUTHOR="Gbenga Anifowoshe <daveanifowoshe@gmail.com>"

COPY ./yarn.lock /app/
COPY ./tsconfig-base.json /app/
COPY ./package.json /app/
COPY ./.prettierrc.js /app/
COPY ./packages/api/package.json /app/packages/api/

WORKDIR /app

RUN yarn install
COPY ./packages/api /app/packages/api/

WORKDIR /app/packages/api
CMD yarn dev