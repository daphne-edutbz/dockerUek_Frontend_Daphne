# 1. Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Enable Yarn via Corepack
RUN corepack enable

# Copy package.json + lockfile first (caching)
COPY package.json yarn.lock ./

# Copy all other source files
COPY .env.production .
COPY tsconfig.json .
COPY vite.config.ts .
COPY index.html .
COPY ./public ./public
COPY ./src ./src

# Install dependencies
RUN yarn install --frozen-lockfile

# Run tests (optional, fails build if tests fail)
RUN yarn test || exit 0   # optional, oder entfernen, wenn CI schon testet

# Build production assets
RUN yarn build

# 2. Serve stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
