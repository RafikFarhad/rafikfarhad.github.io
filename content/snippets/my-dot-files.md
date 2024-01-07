---
title: My (.)dot file collection 📂
description: My terminal stack and dotfiles repository
date: 2024-01-07
tags: [cli, alacrity, oh-my-zsh, tmux, starship, vim]
featured: false
---


Here are the key components for my terminal setup:
- Alacrity
- Oh My Zsh!
- Tmux
- Vim
- Starship


I keep all the dot files for these components in this GitHub repo: [my-dot-files](https://github.com/RafikFarhad/my-dot-files)


This repo has a `deploy.sh` file, which is meant to bootstrap everything from scratch.
But that is not revised often; some functionality might be broken.


Here are the cons of my above stack:


- Alacrity's scrollback and search functionality are not as good as iTerm2's. Looking for a better alternative.
- tmux copy is painful (I use copycat with visual select, which scrollback to the end on selection)
- tmux setup is convenient but overrides many default key bindings, which I think is a drawback of this setup. I should have used the default key bindings.