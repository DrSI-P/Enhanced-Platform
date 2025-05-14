#!/bin/bash

# EdPsych Connect Enhanced Platform (2025) Deployment Script
# This script automates the deployment of the Enhanced Platform to Vercel

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}EdPsych Connect Enhanced Platform (2025) Deployment${NC}"
echo "=================================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI is not installed.${NC}"
    echo "Please install it using: npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
echo -e "${YELLOW}Checking Vercel authentication...${NC}"
VERCEL_TOKEN=$(vercel whoami 2>/dev/null)
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Not logged in to Vercel. Initiating login...${NC}"
    vercel login
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to log in to Vercel. Aborting deployment.${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}Authenticated with Vercel as: $(vercel whoami)${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies. Aborting deployment.${NC}"
    exit 1
fi
echo -e "${GREEN}Dependencies installed successfully.${NC}"
echo ""

# Build the project
echo -e "${YELLOW}Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Aborting deployment.${NC}"
    exit 1
fi
echo -e "${GREEN}Build completed successfully.${NC}"
echo ""

# Deploy to Vercel
echo -e "${YELLOW}Deploying to Vercel...${NC}"
echo "This may take a few minutes..."

# Check if this is a production deployment
read -p "Is this a production deployment? (y/n): " PROD_DEPLOY
if [[ $PROD_DEPLOY == "y" || $PROD_DEPLOY == "Y" ]]; then
    echo -e "${YELLOW}Deploying to production...${NC}"
    vercel --prod
else
    echo -e "${YELLOW}Deploying to preview environment...${NC}"
    vercel
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed. Please check the error messages above.${NC}"
    exit 1
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo ""

# Get the deployment URL
DEPLOYMENT_URL=$(vercel ls | grep "deploy-enhanced-platform-2025" | awk '{print $2}' | head -n 1)
echo -e "Your application is now available at: ${GREEN}$DEPLOYMENT_URL${NC}"

# Domain configuration reminder
echo ""
echo -e "${YELLOW}Domain Configuration:${NC}"
echo "To configure custom domains (edpsychconnect.com and edpsychconnect.app),"
echo "please follow the instructions in DOMAIN_CONFIGURATION_GUIDE.md"

# Final steps
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Test the application thoroughly"
echo "2. Configure custom domains if this is a production deployment"
echo "3. Set up monitoring for the application"
echo ""
echo -e "${GREEN}Deployment process completed!${NC}"