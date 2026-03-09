# ============================== BUILDER STAGE =============================
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

ENV VITE_API=http://backend-service:7777

RUN npm run build 

# ============================== PRODUCTION STAGE =============================

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/dist  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

