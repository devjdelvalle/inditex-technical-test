#Builder
FROM node:18 as builder
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

#Run
FROM nginx
EXPOSE 8080
COPY --from=builder /app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]