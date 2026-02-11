# COMMANDS AND TERMINOLOGIES PART - 4
## REBASE

- alternative of merging
- clean up tool (clean up commits)

Rebasing my branch with master

```git
git rebase master
```

__Note:__  Never run this command on main branch (it can mess up your whole project)

After encountering and resolving merge conflicts use the required commands from below

```git
git rebase --continue
git rebase --abort
```


