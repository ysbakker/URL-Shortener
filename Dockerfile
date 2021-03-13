FROM nginx

LABEL author="Yorrick Bakker"

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/app.conf /etc/nginx/conf.d/
COPY ./dist /usr/share/nginx/html/