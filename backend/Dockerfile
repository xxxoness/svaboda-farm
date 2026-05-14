FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npm run prisma:generate

COPY src ./src

ENV NODE_ENV=production

CMD ["sh", "-c", "npm run prisma:deploy && npm run start"]
