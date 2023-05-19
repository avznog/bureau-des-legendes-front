FROM node:16.15-alpine3.16

WORKDIR /app
COPY ["package*.json","./"]
RUN yarn install
COPY . ./
EXPOSE 3000

# build app
RUN yarn build

# start app
CMD ["yarn", "start"]
