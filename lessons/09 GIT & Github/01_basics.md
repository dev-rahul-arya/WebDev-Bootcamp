# BASICS
## A Small Talk
- Git & Github are different.
- Git -> Software
- Github -> Service

## Verson Control System
- Track files for changes.

## Learning Path
- Get the basics.
- Use it daily.
- Face the Problem -> Solve the Problem.


# COMMANDS & TERMINNOLOGIES - PART 1
## '.git' folder
- A hidden folder created by Git to track files and folder.

## Check Version
```git
git --version
```

## Check Status
```git
git status
```

## Initialization
```git
git init
```

## Staging
Adding single file
```git
git add fileOne.txt
```

Adding multiple files
```git
git add fileOne.txt fileTwo.txt
```

Adding every file
```git
git add .
```

Remove from staging area
```git
git rm --cached fileTwo.txt
```

## Author Configurations
```git
git config --global user.name = "John Doe"
git config --global user.email = "someone@example.com"
```

## Commit
- CheckPoint for your project.
- Flow: Working Directory -> Staging Area -> Repo -> Git Provider
- Flow: Write -> Add -> Commit -> Push 

```git
git commit -m "Add you message here"
```

- Keep commits centric to one feature, one component or on fix.

## Log
Gives the previous commit list
```git
git log
```

Gives concise details about the last commit
```git
git log --oneline
```
