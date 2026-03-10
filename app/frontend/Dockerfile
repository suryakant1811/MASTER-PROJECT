# ============================== BUILDER STAGE =============================
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./       

RUN npm install

COPY . .

RUN npm run build 

# ============================== PRODUCTION STAGE =============================

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/dist  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

