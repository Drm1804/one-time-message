FROM node:22-alpine3.21
RUN apk --no-cache add curl
RUN mkdir /bot
WORKDIR /bot
COPY package.json /bot
COPY package-lock.json /bot
RUN npm ci
COPY tsconfig.json /bot
COPY eslint.config.mjs /bot
COPY eslint.config.cjs /bot
COPY tsconfig.release.json /bot
COPY config.ts /bot
COPY config.type.ts /bot
COPY /src /bot/src
RUN mkdir files
RUN npm run build
CMD ["node", "build/src/main.js"]
