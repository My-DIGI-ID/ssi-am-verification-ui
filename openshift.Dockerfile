FROM node:14-slim as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json
# docker-cache friendly version of npm i
RUN npm ci --legacy-peer-deps
# precompile imported angular modules to cache part of the build or server startup process
RUN npx ngcc
COPY . /usr/src/app
# RUN npx ng lint
# don't build when intending to use for live development mode
ARG CONFIGURATION=production

RUN if [ "serve" != ${CONFIGURATION} ] ; then npx ng build --output-path=dist --configuration=$CONFIGURATION ; fi

# expose ports, create env and ng serve
EXPOSE 4300
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--watch", "--disable-host-check=true", "--poll", "2000"]

# Stage 2: Run stage
FROM nginx:1.18.0-alpine
RUN apk update && apk add jq
RUN apk add --upgrade libssl1.1 libcrypto1.1 libgd libxml2 libcurl curl apk-tools libgcrypt

# Copy the nginx configuration
COPY ./ops/nginx.conf /etc/nginx/conf.d/default.conf

# Copy build from the 'build environment'
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 4300

# generate dynamic json from env
COPY ./ops/docker-entrypoint.prod.sh /docker-entrypoint.sh

## Added to fix permission problems when starting in openshift
RUN chgrp -R 0 /usr/share/nginx && chmod -R g=u /usr/share/nginx && \
    touch /usr/share/nginx/html/assets/config/config.json && chgrp -R 0 /usr/share/nginx/html/assets/config/config.json && chmod g=u /usr/share/nginx/html/assets/config/config.json && \
    chgrp -R 0 /var/cache/nginx && chmod -R g=u /var/cache/nginx && \
    chgrp -R 0 /etc/nginx && chmod -R g=u /etc/nginx && \
    chgrp -R 0 /var/run && chmod -R g=u /var/run

RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
