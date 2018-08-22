FROM node:alpine as builder
RUN apk update && apk add --no-cache make git

# Create app directory
WORKDIR /health-doc
WORKDIR app

COPY ./shared/ /health-doc/shared/
# Install app dependencies
COPY web/package.json web/package-lock.json /health-doc/app/
RUN cd /health-doc/app && npm set progress=false && npm install && npm install -g @angular/cli

# Copy project files into the docker image and build it
COPY ./web/ /health-doc/app
RUN cd /health-doc/app && ng build --prod --aot

# Create server directory
WORKDIR /health-doc/server
COPY server/package.json server/package-lock.json /health-doc/server/
RUN cd /health-doc/server && npm set progress=false && npm install
COPY ./server /health-doc/server
RUN cd /health-doc/server && npm run compile

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /health-doc/app/dist/health-doc /usr/share/nginx/html
COPY --from=builder /health-doc/server /usr/share/server/
COPY ./start.sh /usr/local/start.sh
COPY default.conf /etc/nginx/conf.d/default.conf

ENV APP_ID health-doc
ENV PORT 3000
ENV LOG_LEVEL debug
ENV REQUEST_LIMIT 100kb
ENV SESSION_SECRET healthDoc2018
ENV DATABASE /var/healthdoc/

RUN apk add --update nodejs nodejs-npm

EXPOSE 80

CMD ["/bin/sh", "/usr/local/start.sh"]