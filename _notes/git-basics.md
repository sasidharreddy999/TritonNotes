---
title: "Git Basics Cheat Sheet"
category: "Version Control"
tags: [git, version-control, cheat-sheet]
last_updated: 2025-07-21
---

# Git Basics Cheat Sheet

A quick reference for essential Git commands and workflows.

## Initial Setup

```bash
# Configure user information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize a new repository
git init
```

## Basic Workflow

### Adding Changes
```bash
# Stage specific files
git add filename.txt

# Stage all changes
git add .

# Check status
git status
```

### Committing Changes
```bash
# Commit with message
git commit -m "Your commit message"

# Commit all tracked changes
git commit -am "Your commit message"
```

## Branch Management

```bash
# List branches
git branch

# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch to new branch
git checkout -b feature-name

# Merge branch into current branch
git merge feature-name
```

## Remote Repositories

```bash
# Add remote repository
git remote add origin https://github.com/username/repo.git

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Clone repository
git clone https://github.com/username/repo.git
```

## Useful Commands

```bash
# View commit history
git log --oneline

# Show differences
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo changes to file
git checkout -- filename.txt
```

## Best Practices

1. **Write clear commit messages** - Use present tense and be descriptive
2. **Commit frequently** - Small, focused commits are easier to track
3. **Use branches** - Keep features and experiments separate
4. **Pull before pushing** - Stay synchronized with remote repository
5. **Review changes** - Use `git diff` before committing