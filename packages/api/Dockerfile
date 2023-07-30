FROM node:18
LABEL AUTHOR="Gbenga Anifowoshe <daveanifowoshe@gmail.com>"

RUN apt update

# Yarn
RUN apt install curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt install -y yarn

COPY ./yarn.lock /app/
COPY ./tsconfig-base.json /app/
COPY ./package.json /app/
COPY ./.prettierrc.js /app/
COPY ./packages/api/package.json /app/packages/api/

WORKDIR /app

COPY ./packages/api /app/packages/api/
RUN yarn install

WORKDIR /app/packages/api
CMD yarn dev