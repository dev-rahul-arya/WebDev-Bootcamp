# COMMANDS & TERMINNOLOGIES - PART 3

## GIT DIFF

```git
git diff --staged

git diff <commit id 1> <commit id 2>

git diff <branch 1>...<brank 2>
```

OUTPUT:

```output
diff --git a/index.html b/indexhtml
index b6948f8..99b57 100644
--- a/index.html
+++ b/index.html

............
............
............


```

- where '............' is changes.
- a : initial file
- b : staged file
- never shows whole file, gives just a glimpse of it.

## STASHING

- create a repo, work and commit on main
- switch to another branch and work
- conflicting changes do not allow to switch branch, without commits

### Create stash

```git
git stash
```

### Move to last stash

```git 
git stash pop
```

### Listing all stashes

```git 
git stash list
```

Note: Stashes are globally accessible (to all branches).
