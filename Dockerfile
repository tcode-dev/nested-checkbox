FROM node:14.5.0

WORKDIR /home/app

ADD ./sample/backend /home/app/sample/backend
ADD ./sample/public /home/app/sample/public
ADD ./sample/server.js /home/app/sample/server.js
ADD ./sample/package.remote.backend.json /home/app/package.json

RUN yarn install

ENV PORT 80

EXPOSE 80

CMD [ "node", "sample/server.js" ]
