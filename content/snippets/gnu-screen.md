---
title: GNU Screen init 📺
date: 2024-01-07
tags: [linux, cli, gnu-screen]
featured: true
---


Recently, I've been using GNU Screen on servers.


I've been using Tmux for a while, but when I work on arbitrary machines, I don't always have the option to install Tmux.
Or even worse, my Tmux default config has a lot of customizations that I don't want to have to install on every machine I work on.


Screen is a great alternative, and it's installed on almost every machine I've ever worked on.
Here is a `.screenrc` file that I've been using to get started with the GNU screen.


```text
autodetach on
startup_message off
hardstatus alwayslastline
shelltitle 'bash'
defscrollback 100000


hardstatus string '%{gk}[%{wk}%?%-Lw%?%{=b kR}(%{W}%n*%f %t%?(%u)%?%{=b kR})%{= w}%?%+Lw%?%? %{g}][%{d}%l%{g}][ %{= w}%Y/%m/%d %0C:%s%a%{g} ]%{W}'
```


This gives me a nice status bar at the bottom of the screen and a nice title in the terminal window, which is helpful when I open multiple windows on a single session.
