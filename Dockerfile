# Backend Dockerfile (Root Directory)
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm install --legacy-peer-deps

# Copy backend source code (exclude frontend)
COPY server.js ./
COPY config ./config
COPY routes ./routes
COPY controllers ./controllers
COPY middleware ./middleware
COPY models ./models
COPY scripts ./scripts
COPY views ./views

# Create uploads directory
RUN mkdir -p public/uploads

EXPOSE 5000

# Development mode with nodemon
CMD ["npm", "run", "dev"]