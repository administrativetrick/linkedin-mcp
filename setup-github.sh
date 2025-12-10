#!/bin/bash

# GitHub Setup Script for LinkedIn MCP Server
# This script will create a new GitHub repo and push your code

echo "🚀 Setting up GitHub repository for LinkedIn MCP Server"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it from: https://cli.github.com/"
    echo ""
    echo "Or use Option 2 in the GITHUB_SETUP.md guide"
    exit 1
fi

# Check if user is logged in
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub first:"
    gh auth login
fi

echo "Creating GitHub repository..."
echo ""

# Prompt for repository details
read -p "Enter repository name (default: linkedin-jobs-mcp-server): " REPO_NAME
REPO_NAME=${REPO_NAME:-linkedin-jobs-mcp-server}

read -p "Enter repository description (default: MCP server for LinkedIn job search): " REPO_DESC
REPO_DESC=${REPO_DESC:-"MCP server for LinkedIn job search integration with Claude"}

read -p "Make repository public? (y/n, default: y): " IS_PUBLIC
IS_PUBLIC=${IS_PUBLIC:-y}

# Set visibility flag
if [[ $IS_PUBLIC == "y" ]]; then
    VISIBILITY="--public"
else
    VISIBILITY="--private"
fi

# Initialize git if not already done
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: LinkedIn Jobs MCP Server"
fi

# Create GitHub repository and push
echo "Creating GitHub repository: $REPO_NAME"
gh repo create "$REPO_NAME" $VISIBILITY --description "$REPO_DESC" --source=. --push

echo ""
echo "✅ Done! Your repository is now live on GitHub!"
echo ""
echo "Repository URL: https://github.com/$(gh api user -q .login)/$REPO_NAME"
echo ""
echo "Next steps:"
echo "1. Visit your repository on GitHub"
echo "2. Add topics/tags for discoverability"
echo "3. Star the repo to show it in your profile!"
