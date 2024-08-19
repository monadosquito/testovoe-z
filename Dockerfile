FROM node:22-alpine3.19 as base
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app/

FROM base as dev
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM base as predeploy
RUN npm run build

FROM nginx:1.27.1 as deploy
EXPOSE 80
COPY --from=predeploy /app/build/ /usr/share/nginx/html/