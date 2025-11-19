# GitHub Actions Workflows

This directory contains automated workflows for CI/CD, publishing, and security.

## 📋 Workflows Overview

### 1. **CI (Continuous Integration)** - `ci.yml`
**Triggers:** Every push and pull request to `main` or `develop`

**What it does:**
- ✅ Builds the library on multiple OS (Ubuntu, Windows, macOS)
- ✅ Tests on Node.js versions 18, 20, and 22
- ✅ Verifies TypeScript types
- ✅ Checks bundle size
- ✅ Uploads build artifacts

**Status:** Runs automatically on every commit

---

### 2. **Publish to npm** - `publish.yml`
**Triggers:**
- When a new GitHub Release is created
- Manual trigger via GitHub Actions UI

**What it does:**
- ✅ Builds the library
- ✅ Runs type checks
- ✅ Publishes to npm with provenance
- ✅ Creates release summary

**Requirements:** `NPM_TOKEN` secret must be configured

---

### 3. **Create Release** - `release.yml`
**Triggers:** When you push a version tag (e.g., `v1.0.1`)

**What it does:**
- ✅ Creates GitHub Release
- ✅ Generates changelog from git commits
- ✅ Attaches npm tarball to release

**Usage:**
```bash
git tag v1.0.1
git push origin v1.0.1
```

---

### 4. **CodeQL Security Analysis** - `codeql.yml`
**Triggers:**
- Every push to `main`
- Every pull request
- Weekly on Sundays

**What it does:**
- ✅ Scans code for security vulnerabilities
- ✅ Detects common coding errors
- ✅ Reports in GitHub Security tab

---

## 🔐 Required Secrets

### NPM_TOKEN (for publishing)

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token" → "Automation"
3. Copy the token
4. Go to your GitHub repo → Settings → Secrets and variables → Actions
5. Click "New repository secret"
6. Name: `NPM_TOKEN`
7. Value: (paste your token)
8. Click "Add secret"

---

## 🚀 How to Use

### Publishing a New Version

**Option 1: Automatic (via GitHub Release)**
1. Go to your repo → Releases → "Draft a new release"
2. Create a new tag (e.g., `v1.0.1`)
3. Fill in release notes
4. Click "Publish release"
5. Workflows automatically run and publish to npm

**Option 2: Via Git Tags**
```bash
# Update version in package.json
npm version patch  # or minor/major

# Push the tag
git push origin v1.0.1

# This triggers the release workflow
```

**Option 3: Manual Trigger**
1. Go to Actions → "Publish to npm"
2. Click "Run workflow"
3. Enter version number
4. Click "Run workflow"

---

### Viewing Workflow Results

- **CI Status:** Check the badge on your README
- **Published Packages:** https://www.npmjs.com/package/universal-rate-limiter
- **Security Alerts:** Repo → Security tab → Code scanning alerts
- **Workflow Runs:** Repo → Actions tab

---

## 📊 Adding Status Badges

Add these to your README.md:

```markdown
[![CI](https://github.com/MainaJoseph/universal-rate-limiter/workflows/CI/badge.svg)](https://github.com/MainaJoseph/universal-rate-limiter/actions)
[![npm version](https://img.shields.io/npm/v/universal-rate-limiter.svg)](https://www.npmjs.com/package/universal-rate-limiter)
[![npm downloads](https://img.shields.io/npm/dm/universal-rate-limiter.svg)](https://www.npmjs.com/package/universal-rate-limiter)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
```

---

## 🛠️ Customization

### Changing Node.js Versions

Edit `ci.yml`:
```yaml
node-version: [18.x, 20.x, 22.x]  # Add or remove versions
```

### Changing Trigger Branches

Edit any workflow:
```yaml
on:
  push:
    branches: [main, develop, your-branch]  # Add branches
```

### Disabling a Workflow

Rename the file to add `.disabled`:
```bash
mv codeql.yml codeql.yml.disabled
```

---

## 📝 Workflow Best Practices

1. ✅ Always test locally before pushing
2. ✅ Use semantic versioning (v1.0.0, v1.0.1, etc.)
3. ✅ Write meaningful commit messages (used in changelogs)
4. ✅ Keep secrets secure (never commit NPM_TOKEN)
5. ✅ Monitor workflow runs for failures

---

## 🐛 Troubleshooting

### Workflow fails on "npm publish"
- Check if `NPM_TOKEN` secret is set correctly
- Verify you're logged in to npm
- Check if package version already exists

### TypeScript errors in CI
- Run `npx tsc --noEmit` locally first
- Fix any type errors before pushing

### Release workflow doesn't trigger
- Ensure tag format is `v*.*.*` (e.g., `v1.0.0`)
- Check if you pushed the tag: `git push --tags`

---

## 📚 Learn More

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
