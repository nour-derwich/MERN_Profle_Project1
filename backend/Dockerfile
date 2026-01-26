FROM node:18-alpine

WORKDIR /app

# Install PostgreSQL client for health checks
RUN apk add --no-cache postgresql-client

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p public/uploads && chown -R node:node public/uploads

# Switch to non-root user
USER node

EXPOSE 5000

# Add a simple health check script
CMD ["npm", "start"]