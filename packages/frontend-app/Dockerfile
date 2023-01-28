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
COPY ./packages/frontend-app/package.json /app/packages/frontend-app/

WORKDIR /app

RUN yarn install
COPY ./packages/frontend-app /app/packages/frontend-app/

WORKDIR /app/packages/frontend-app

RUN yarn build

CMD yarn 