# Frontend Dockerfile
# Use Node 20 (some packages require it)
FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    gcc \
    autoconf \
    automake \
    libtool \
    nasm

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

EXPOSE 3000

# Development mode
CMD ["npm", "start"]