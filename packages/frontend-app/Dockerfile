FROM node:18
LABEL AUTHOR="Gbenga Anifowoshe <daveanifowoshe@gmail.com>"

COPY ./yarn.lock /app/
COPY ./tsconfig-base.json /app/
COPY ./package.json /app/
COPY ./.prettierrc.js /app/
COPY ./packages/frontend-app/package.json /app/packages/frontend-app/

WORKDIR /app

RUN yarn install
COPY ./packages/frontend-app /app/packages/frontend-app/

WORKDIR /app/packages/frontend-app

EXPOSE 9999

CMD yarn dev