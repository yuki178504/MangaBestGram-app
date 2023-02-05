FROM node:16.17.0-alpine as build
WORKDIR /usr/src/app
COPY ./app /usr/src/app
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm update -g npm
RUN npm install --force
RUN export NODE_OPTIONS="--max-old-space-size=3072"
RUN npm run build

FROM nginx:1.15.8
RUN rm -f /etc/nginx/conf.d/*
COPY --from=build /usr/src/app/build /var/www
COPY ./nginx.conf /etc/nginx/conf.d/
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf
