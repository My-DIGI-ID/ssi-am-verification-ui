FROM node:14.15.5-alpine3.10

RUN apk add --no-cache --virtual  git
RUN apk add --upgrade libssl1.1 libcrypto1.1 libgd libxml2 libcurl curl apk-tools libgcrypt gettext
WORKDIR /opt/ssi-am-accreditation-ui

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY angular.json angular.json
COPY src src
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY ./ops/docker-entrypoint.dev.sh /docker-entrypoint.sh

EXPOSE 4300

RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/bin/sh", "-c", "npm start"]
