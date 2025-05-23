# 1단계: React build
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: nginx 설정 적용
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# 🔽 이 부분 추가
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
