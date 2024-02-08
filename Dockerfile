From node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli@~8.3.5

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
