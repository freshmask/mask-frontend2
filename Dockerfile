FROM nginx
WORKDIR /usr/share/nginx/html
ADD ./dist/mask-frontend/ ./
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
