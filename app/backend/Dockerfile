# ============================== BUILDER STAGE =============================
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ============================== PRODUCTION STAGE =============================
FROM node:20-slim

WORKDIR /app

COPY --from=builder  /app   /app

EXPOSE 7777

CMD [ "node","server.js" ]
