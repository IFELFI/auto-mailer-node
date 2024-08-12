FROM node:22-alpine as build

LABEL title="auto-mailer"
LABEL version="1.0.0"
LABEL maintainer="ifelfi"

WORKDIR /app
COPY . ./
RUN npm install -y && \
  npm run build && \
  npm prune --production

FROM node:22-alpine as deploy

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./

EXPOSE 5000

ENTRYPOINT ["node", "./dist/index.js"]