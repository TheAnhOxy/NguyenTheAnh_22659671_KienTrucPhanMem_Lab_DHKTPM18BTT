# Stage 1: Build React app
FROM node:18-alpine AS build

# tạo thư mục trong container
WORKDIR /app

# copy package.json trước để cache
COPY package*.json ./

# cài dependencies
RUN npm install

# copy toàn bộ source code
COPY . .

# build React
RUN npm run build


# Stage 2: Run bằng serve
FROM node:18-alpine

WORKDIR /app

# cài serve để chạy build
RUN npm install -g serve

# copy build từ stage 1
COPY --from=build /app/build ./build

# mở port
EXPOSE 3000

# chạy app
CMD ["serve", "-s", "build", "-l", "3000"]