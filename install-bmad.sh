#!/bin/bash

# BMAD-METHOD v6 Alpha Installation Script
# This script sets up Node.js v20 and runs the BMAD installer

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  BMAD-METHOD v6 Alpha Installation${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Get the script directory (project root)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}📁 Project directory:${NC} $SCRIPT_DIR"
echo ""

# Setup nvm and Node.js v20
echo -e "${YELLOW}🔧 Setting up Node.js v20...${NC}"
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
    nvm use 20.19.4 2>/dev/null || nvm use 20 2>/dev/null || {
        echo -e "${YELLOW}⚠️  Node v20.19.4 not found, trying to use any v20...${NC}"
        nvm use 20 || {
            echo -e "${YELLOW}⚠️  No Node v20 found. Available versions:${NC}"
            nvm list
            echo ""
            echo -e "${YELLOW}Please install Node.js v20+ and run this script again.${NC}"
            exit 1
        }
    }
    echo -e "${GREEN}✅ Using Node.js $(node --version)${NC}"
else
    echo -e "${YELLOW}⚠️  nvm not found. Checking system Node.js...${NC}"
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        echo -e "${YELLOW}❌ Node.js v20+ required. Current version: $(node --version)${NC}"
        echo "Please install Node.js v20+ and run this script again."
        exit 1
    fi
    echo -e "${GREEN}✅ Using Node.js $(node --version)${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Starting BMAD Installer${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}The installer will prompt you for:${NC}"
echo "  1. Installation directory (default: current directory)"
echo "  2. Module selection (BMM, BMB, CIS)"
echo "  3. Configuration (your name, language preferences)"
echo "  4. IDE integration (Cursor, Claude Code, etc.)"
echo ""
echo -e "${GREEN}Starting installer now...${NC}"
echo ""

# Run the installer
npx bmad-method@alpha install

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Installation Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Load any agent in your IDE (Cursor)"
echo "  2. Run '*workflow-init' to set up your project workflow path"
echo "  3. Follow the Quick Start guide in the README"
echo ""
echo -e "${BLUE}📚 Documentation:${NC} BMAD-METHOD/README.md"
echo ""

