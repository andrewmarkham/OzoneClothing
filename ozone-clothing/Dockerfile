FROM node:23-alpine AS builder
EXPOSE 3000

WORKDIR /app

#ENV NEXT_PRIVATE_STANDALONE=true

COPY . .

#ENV NODE_ENV=production

#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install
RUN npm run build

#USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD HOSTNAME="0.0.0.0" npm run start

#CMD HOSTNAME="0.0.0.0" ["npm", "run", "start"]
#CMD HOSTNAME="0.0.0.0" node .next/standalone/server.js