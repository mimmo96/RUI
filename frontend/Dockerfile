FROM node:14.0.0-alpine

WORKDIR /code
COPY code .

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]