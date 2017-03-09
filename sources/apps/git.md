# Git cheatsheet
---

## Setup

**User name and email**  
`$ git config --global user.name "John Doe"`  
`$ git config --global user.email johndoe@example.com`

**Configure line endings to linux style**  
`git config --global core.autocrlf input`

## Aliasing

Using command line:
```
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

Or edit `~/.gitconfig` file.

## Commands

* Get repository: `git clone <repo url>`
* Switch branches: `git checkout <branchname>`
* Create a new branch and check it out: `git checkout -b <branchname>`
* List branches (local & remote): `git branch -av`
* Add files: `git add <files>` or `git add *` (all) or `git add .` (existing on remote).
* Commit: `git commit -m "<commit info>"`
* Check status: `git status`
* Send changes to branch: `git push origin <branchName>`
* Add remote repo: `git remote add origin <server>`
* Delete local branch: `git branch -d <branchname>`
* Delete remote branch: `git push origin --delete <branchname>`
* Fetch and merge changes: `git pull` or `git pull origin <branchname>`
* Update cache: `git fetch`
* Update remotes: `git remote update`
* Merge <branchname> into active branch: `git merge <branchname>`
* Show log: `git log`
* Tag commit: `git tag <tag name> <commitID>`
* Upload tags: `git push --tags origin`
