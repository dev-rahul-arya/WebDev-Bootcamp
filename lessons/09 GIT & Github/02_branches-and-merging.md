# COMMANDS & TERMINNOLOGIES - PART 2
## .gitignore
Everything mentioned in '.gitignore' won't be pushed.
- node modules, api keys, secrets.
- you can get templates from web.

```gitignore
.env
node_modules/
.vscode/
```

## .gitconfig
User configs like name, email, siginkey, gpg, etc. are stored here.

# BRANCHES
- It's like an alternative timline. Different branches have different progress, can be merged and deleted.
- Dafault one is 'master' but now called 'main'.
- HEAD: points to the branch which you are currently working on.

## Checks existing and current branch
```git
git branch
```
## Creating a branch
```git
git branch beta
```

## Renaming a branch
```git
git branch -M main
```

## Switching to a branch

```git
git checkout feat/NavBar

git checkout -b feat/Contact
```

```git
git switch feat/NavBar

git switch -c feat/Contact
```

- 'switch' is newer command.
- '-b' and '-c' for creating and switching to a new branch.
- commit before switching to another branch
- you can go to '.git' folder to check the 'HEAD' file for current branch.

## Deleting a branch
```git
git branch -d "feat/Contact"
```

## Merging a branch

- First switch to the 'main' branch or in which you want to merge.
- Run the below command.

```git
git merge feat/NavBar
```

### Merge Conflicts

```git
<<<<< HEAD (Current Change)
line 1
line 2
======
line 3
>>>>> byFix (Incoming Change)
```

- above '=====' : from current branch
- below '=====' : from incoming branch
- git tries it best, but keep whatever you want and remove those markers.
