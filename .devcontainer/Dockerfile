# Create image based on the official Node 6 image from dockerhub
FROM node:20-alpine3.18

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin
RUN pnpm add @angular/cli -g

# Create a directory where our app will be placed
RUN mkdir -p /api

# Change directory so that our commands run inside this new directory
WORKDIR /api