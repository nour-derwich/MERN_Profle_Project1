# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Copy environment file
COPY .env.docker .env

# Build the React app with proper configuration
ENV NODE_ENV=production
RUN npm run build

# Verify build output
RUN ls -la build/

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# IMPORTANT: Remove the default config FIRST
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx's default directory
COPY --from=builder /app/build /usr/share/nginx/html

# Verify the config was copied correctly
RUN echo "=== Checking nginx config ===" && \
    cat /etc/nginx/conf.d/default.conf && \
    echo "=== Config check complete ===" && \
    nginx -t

# Verify files are copied
RUN ls -la /usr/share/nginx/html/

# Create a health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]