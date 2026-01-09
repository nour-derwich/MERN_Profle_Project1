#!/bin/bash

# ============================================
# Docker Diagnostic & Auto-Fix Script
# For Monorepo Structure (Backend in Root)
# ============================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"

echo -e "${BLUE}========================================"
echo "  Docker Diagnostic Tool"
echo "  (Monorepo Structure)"
echo "========================================${NC}"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check service health
check_service() {
    local service=$1
    local port=$2
    
    echo -n "Checking $service... "
    if curl -f -s "http://localhost:$port" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not responding${NC}"
        return 1
    fi
}

# 1. Check Docker Installation
echo -e "${BLUE}[1/10] Checking Docker installation...${NC}"
if command_exists docker; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓${NC} Docker installed: $DOCKER_VERSION"
else
    echo -e "${RED}✗${NC} Docker not installed!"
    echo "Install from: https://docs.docker.com/get-docker/"
    exit 1
fi

# 2. Check Docker Compose
echo ""
echo -e "${BLUE}[2/10] Checking Docker Compose...${NC}"
if command_exists docker-compose; then
    COMPOSE_VERSION=$(docker-compose --version)
    echo -e "${GREEN}✓${NC} Docker Compose installed: $COMPOSE_VERSION"
else
    echo -e "${RED}✗${NC} Docker Compose not installed!"
    echo "Install from: https://docs.docker.com/compose/install/"
    exit 1
fi

# 3. Check Docker Service
echo ""
echo -e "${BLUE}[3/10] Checking Docker service...${NC}"
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Docker service running"
else
    echo -e "${RED}✗${NC} Docker service not running"
    echo "Starting Docker..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open -a Docker
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo systemctl start docker
    fi
    sleep 5
fi

# 4. Check Project Files
echo ""
echo -e "${BLUE}[4/10] Checking project files...${NC}"
files_ok=true

# Check docker-compose file
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}✗${NC} $COMPOSE_FILE not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} $COMPOSE_FILE found"
fi

# Check environment file
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}✗${NC} $ENV_FILE not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} $ENV_FILE found"
fi

# Check backend files (in root)
if [ ! -f "Dockerfile" ]; then
    echo -e "${RED}✗${NC} Dockerfile not found in root (backend)"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} Dockerfile found in root"
fi

if [ ! -f "server.js" ]; then
    echo -e "${RED}✗${NC} server.js not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} server.js found"
fi

if [ ! -f "package.json" ]; then
    echo -e "${RED}✗${NC} package.json not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} package.json found"
fi

# Check frontend files
if [ ! -d "frontend" ]; then
    echo -e "${RED}✗${NC} frontend/ directory not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} frontend/ directory found"
fi

if [ ! -f "frontend/Dockerfile" ]; then
    echo -e "${RED}✗${NC} frontend/Dockerfile not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} frontend/Dockerfile found"
fi

if [ ! -f "frontend/package.json" ]; then
    echo -e "${RED}✗${NC} frontend/package.json not found"
    files_ok=false
else
    echo -e "${GREEN}✓${NC} frontend/package.json found"
fi

if [ "$files_ok" = false ]; then
    echo -e "${YELLOW}⚠ Some required files are missing. Please create them.${NC}"
    exit 1
fi

# 5. Check for Port Conflicts
echo ""
echo -e "${BLUE}[5/10] Checking for port conflicts...${NC}"
ports_ok=true

check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠${NC} Port $port is in use"
        PID=$(lsof -Pi :$port -sTCP:LISTEN -t)
        PROCESS=$(ps -p $PID -o comm= 2>/dev/null || echo "unknown")
        echo "   Process: $PROCESS (PID: $PID)"
        read -p "   Kill this process? (y/n): " kill_process
        if [ "$kill_process" = "y" ]; then
            kill -9 $PID 2>/dev/null
            echo -e "${GREEN}✓${NC} Process killed"
        else
            ports_ok=false
        fi
    else
        echo -e "${GREEN}✓${NC} Port $port is available"
    fi
}

check_port 3000
check_port 5000
check_port 5432

if [ "$ports_ok" = false ]; then
    echo -e "${YELLOW}⚠ Some ports are in use. Consider stopping those services.${NC}"
fi

# 6. Check Disk Space
echo ""
echo -e "${BLUE}[6/10] Checking disk space...${NC}"
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 90 ]; then
    echo -e "${RED}✗${NC} Disk usage is ${DISK_USAGE}% - Low space!"
    echo "   Consider cleaning up: docker system prune -a"
elif [ $DISK_USAGE -gt 75 ]; then
    echo -e "${YELLOW}⚠${NC} Disk usage is ${DISK_USAGE}% - Getting full"
else
    echo -e "${GREEN}✓${NC} Disk usage is ${DISK_USAGE}% - OK"
fi

# 7. Clean Old Containers/Images (optional)
echo ""
echo -e "${BLUE}[7/10] Checking for old containers...${NC}"
OLD_CONTAINERS=$(docker ps -aq -f status=exited 2>/dev/null | wc -l)
if [ $OLD_CONTAINERS -gt 0 ]; then
    echo -e "${YELLOW}⚠${NC} Found $OLD_CONTAINERS stopped containers"
    read -p "Remove them? (y/n): " clean_containers
    if [ "$clean_containers" = "y" ]; then
        docker rm $(docker ps -aq -f status=exited) 2>/dev/null
        echo -e "${GREEN}✓${NC} Cleaned up stopped containers"
    fi
else
    echo -e "${GREEN}✓${NC} No stopped containers"
fi

# 8. Stop Existing Services
echo ""
echo -e "${BLUE}[8/10] Stopping existing services...${NC}"
docker-compose -f $COMPOSE_FILE down 2>/dev/null
echo -e "${GREEN}✓${NC} Services stopped"

# 9. Build and Start Services
echo ""
echo -e "${BLUE}[9/10] Building and starting services...${NC}"
echo "This may take a few minutes..."
docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE up -d --build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Services started successfully"
else
    echo -e "${RED}✗${NC} Failed to start services"
    echo "Check logs with: docker-compose -f $COMPOSE_FILE logs"
    exit 1
fi

# 10. Wait and Test Services
echo ""
echo -e "${BLUE}[10/10] Testing services...${NC}"
echo "Waiting for services to be ready..."
sleep 15

# Check containers
echo ""
echo "Container Status:"
docker-compose -f $COMPOSE_FILE ps

# Test endpoints
echo ""
echo "Testing endpoints..."
check_service "Backend" 5000 || BACKEND_FAILED=true
check_service "Frontend" 3000 || FRONTEND_FAILED=true

# Test database
echo -n "Checking Database... "
if docker-compose -f $COMPOSE_FILE exec -T postgres psql -U postgres -d portfolio_local -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Connected${NC}"
else
    echo -e "${RED}✗ Connection failed${NC}"
    DB_FAILED=true
fi

# Show results
echo ""
echo -e "${BLUE}========================================"
echo "  Diagnostic Complete"
echo "========================================${NC}"
echo ""

if [ -z "$BACKEND_FAILED" ] && [ -z "$FRONTEND_FAILED" ] && [ -z "$DB_FAILED" ]; then
    echo -e "${GREEN}✓ All services are running correctly!${NC}"
    echo ""
    echo "Access your application:"
    echo "  • Frontend: http://localhost:3000"
    echo "  • Backend:  http://localhost:5000"
    echo "  • Health:   http://localhost:5000/health"
    echo ""
    echo "Project Structure:"
    echo "  • Backend:  Root directory (server.js)"
    echo "  • Frontend: frontend/ directory"
else
    echo -e "${YELLOW}⚠ Some services have issues:${NC}"
    [ ! -z "$BACKEND_FAILED" ] && echo "  • Backend not responding"
    [ ! -z "$FRONTEND_FAILED" ] && echo "  • Frontend not responding"
    [ ! -z "$DB_FAILED" ] && echo "  • Database connection failed"
    echo ""
    echo "Troubleshooting commands:"
    echo "  • View logs: docker-compose -f $COMPOSE_FILE logs -f"
    echo "  • Restart: docker-compose -f $COMPOSE_FILE restart"
    echo "  • Check backend: docker-compose -f $COMPOSE_FILE logs backend"
    echo "  • Check database: docker-compose -f $COMPOSE_FILE logs postgres"
fi

echo ""
echo "Common commands:"
echo "  • View logs: docker-compose -f $COMPOSE_FILE logs -f"
echo "  • Stop: docker-compose -f $COMPOSE_FILE down"
echo "  • Restart: docker-compose -f $COMPOSE_FILE restart"
echo "  • Rebuild: docker-compose -f $COMPOSE_FILE up -d --build"
echo ""

# Offer to show logs if there are issues
if [ ! -z "$BACKEND_FAILED" ] || [ ! -z "$FRONTEND_FAILED" ] || [ ! -z "$DB_FAILED" ]; then
    read -p "View logs now? (y/n): " view_logs
    if [ "$view_logs" = "y" ]; then
        docker-compose -f $COMPOSE_FILE logs --tail=50
    fi
fi