FROM node:14.15.5-alpine3.10 as serve

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

# docker-cache friendly version of npm i
RUN npm ci

# precompile imported angular modules to cache part of the build or server startup process
RUN npx ngcc

COPY . /usr/src/app

# expose ports, create env and ng serve
ARG VERSION=latest
ENV SSIBK_COMPANY_UI_VERSION=${VERSION}
EXPOSE 4200
CMD ["npm", "start"]

# Stage 2: do a prod build
FROM serve as build

RUN npx ng lint
RUN npx ng build --output-path=dist --configuration=$CONFIGURATION

# Stage 3: Run stage
FROM nginx:1.18.0-alpine

RUN apk update && apk add jq

# Copy the nginx configuration
COPY ./ops/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build from the 'build environment'
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# generate dynamic json from env
COPY ./ops/docker-entrypoint.sh /
ARG VERSION=latest
ENV SSIBK_COMPANY_UI_VERSION=${VERSION}
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]