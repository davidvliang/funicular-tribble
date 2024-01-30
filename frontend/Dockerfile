FROM node:21.6.0-alpine3.18

# RUN mkdir -p /opt

WORKDIR /opt

COPY ./package.json .

RUN npm install

# COPY src/ .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]