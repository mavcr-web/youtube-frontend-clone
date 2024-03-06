# Client App
FROM node:20-alpine3.18 AS builder
LABEL stage=builder
RUN corepack enable
RUN corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN mkdir -p /api
WORKDIR /api
COPY package*.json ./
RUN pnpm i
COPY . .
RUN pnpm run build
# Final image
FROM nginx:alpine
COPY --from=builder /api/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# docker build -t frontend . && docker image prune --filter label=stage=builder -f
# crea la imagen y borra las imagenes donde el label sea stage=builder
# docker build -t frontend .
# docker image prune --filter label=stage=builder -f // para borrar la imagen de builder
# YA COMPILA Y SIRVE LA APLICACION AUNQUE TUVE PROBLEMAS CON LOS PUERTO CON DOCKER RUN NO ASI CON DOCKER COMPOSE
