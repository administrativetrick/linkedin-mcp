# GitHub Setup Guide - LinkedIn Jobs MCP Server

Complete guide to get your MCP server on GitHub.

## **Option 1: Using GitHub CLI (Fastest - 2 minutes)**

### Prerequisites
- GitHub CLI installed: https://cli.github.com/
- GitHub account

### Steps

1. **Navigate to your project:**
   ```bash
   cd linkedin-mcp-server
   ```

2. **Make the script executable:**
   ```bash
   chmod +x setup-github.sh
   ```

3. **Run the setup script:**
   ```bash
   ./setup-github.sh
   ```

4. **Follow the prompts:**
   - Repository name (or press Enter for default)
   - Description (or press Enter for default)
   - Public or private (or press Enter for public)

**Done!** Your repo is live on GitHub.

---

## **Option 2: Manual Setup (5 minutes)**

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `linkedin-jobs-mcp-server`
   - **Description:** "MCP server for LinkedIn job search integration with Claude"
   - **Visibility:** Public (or Private)
   - **DO NOT** initialize with README (we already have one)
3. Click "Create repository"

### Step 2: Initialize Git Locally

```bash
cd linkedin-mcp-server

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LinkedIn Jobs MCP Server

- Complete MCP server implementation with TypeScript
- LinkedIn job search with advanced filtering
- Comprehensive documentation and examples
- Ready for production use"
```

### Step 3: Connect to GitHub

GitHub will show you commands after creating the repo. Use these:

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/linkedin-jobs-mcp-server.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your GitHub username.

### Step 4: Verify

Visit your repository:
```
https://github.com/YOUR_USERNAME/linkedin-jobs-mcp-server
```

---

## **Option 3: Using GitHub Desktop (GUI)**

1. **Open GitHub Desktop**
2. **File → Add Local Repository**
3. Browse to `linkedin-mcp-server` folder
4. Click "Create Repository" if prompted
5. Click "Publish repository"
6. Choose public/private and click "Publish"

---

## **After Publishing - Enhance Your Repo**

### Add Topics/Tags

On your GitHub repo page:
1. Click the gear icon ⚙️ next to "About"
2. Add topics:
   - `mcp`
   - `model-context-protocol`
   - `linkedin`
   - `job-search`
   - `typescript`
   - `anthropic`
   - `claude`
   - `mcp-server`

### Add a GitHub Description

Same location, set description:
```
🔍 Model Context Protocol (MCP) server enabling Claude to search LinkedIn jobs with advanced filtering. Built with TypeScript.
```

### Enable Issues and Discussions (Optional)

- **Settings** → **General**
- Check "Issues" and "Discussions"

### Add GitHub Actions (Optional)

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Check TypeScript
      run: npx tsc --noEmit
```

---

## **Recommended Repository Settings**

### Branch Protection (Optional)
If you plan to collaborate:
- **Settings** → **Branches**
- Add rule for `main` branch
- Require pull request reviews

### Social Preview Image
Create a nice banner image (1280×640px) showing:
- "LinkedIn Jobs MCP Server"
- Logo/icon
- Key features

Upload in **Settings** → **General** → Social preview

---

## **Promote Your Repository**

### Share it:
- **Anthropic MCP Servers list:** https://github.com/modelcontextprotocol/servers
- **Reddit:** r/ClaudeAI, r/programming
- **Twitter/X:** Tag @AnthropicAI
- **LinkedIn:** Share with your network

### Add to MCP Community
Submit a PR to add your server to:
- https://github.com/modelcontextprotocol/servers

### Create a Quick Video
Record a 2-minute demo showing:
1. Asking Claude to search jobs
2. Results appearing
3. Using filters

---

## **Git Commands Quick Reference**

### Making Changes

```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push
```

### Create a Release

```bash
# Create a tag
git tag -a v1.0.0 -m "First release"

# Push tag
git push origin v1.0.0
```

Then go to GitHub → Releases → Draft a new release

---

## **Troubleshooting**

### "Permission denied (publickey)"

You need to set up SSH keys:
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Add this to GitHub → Settings → SSH Keys
```

Or use HTTPS instead:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/linkedin-jobs-mcp-server.git
```

### "Repository already exists"

```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR_USERNAME/linkedin-jobs-mcp-server.git
```

### Large Files Warning

Add to `.gitignore`:
```
node_modules/
build/
*.log
```

---

## **Next Steps After Publishing**

1. ⭐ **Star your own repo** (so it shows in your profile)
2. 📝 **Write a blog post** about building MCP servers
3. 🎥 **Record a demo video**
4. 🐛 **Set up issue templates**
5. 🤝 **Add contributing guidelines**
6. 📊 **Add badges** to README (build status, license, etc.)

---

## **Example Repository Structure (After Publishing)**

```
linkedin-jobs-mcp-server/
├── .github/
│   └── workflows/
│       └── build.yml
├── src/
│   └── index.ts
├── build/               # Added to .gitignore
├── node_modules/        # Added to .gitignore
├── .gitignore
├── README.md
├── QUICKSTART.md
├── EXAMPLES.md
├── PROJECT_SUMMARY.md
├── GITHUB_SETUP.md     # This file
├── LICENSE
├── package.json
└── tsconfig.json
```

---

## **Questions?**

- **GitHub Docs:** https://docs.github.com/
- **GitHub CLI:** https://cli.github.com/manual/
- **Git Basics:** https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control

---

**Ready to share your MCP server with the world! 🚀**
