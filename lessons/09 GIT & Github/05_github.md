# COMMAND AND TERMINOLOGIES PART - 5

## REMOTE
```git
git remote -v

git remote add <name> <URL>
git remote add origin https://github.com/dev-rahul-arya/WebDev-Bootcamp.git

git rename <oldname> <newname>
git remote remove <name>
```

## PUSH
```git
git push <remote> <branch>
git push origin main
git push -u origin main
git push

```
The '-u' sets an upstream so that later on you can use 'git push' only instead of that long command again and again.

```git
git clone <URL>
git fetch
git pull origin main
git pull
```

- git fetch: gets the info but don't put in working directory.
- git pull: gets info & add it in the working directory.
- git pull = git fetch + git merge


