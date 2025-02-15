# Angular uygulamasını derleme aşaması
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Nginx aşaması
FROM nginx:alpine

# Build aşamasında oluşan dist çıktısının doğru dizinde olup olmadığını kontrol et
COPY --from=build /app/dist/motion-meet.web/browser /usr/share/nginx/html

# Nginx yapılandırmasını ekleyelim
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]