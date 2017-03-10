# Linux notes

## Fedora after install steps

#### Set hostname
```
hostnamectl status
hostnamectl set-hostname --static “sandbox”
```

#### Basic install

```
dnf update
dnf install -y vim dkms java-1.8.0-openjdk nodejs net-tools
dnf groupinstall -y “Development tools”
```

Also useful:
```
dnf install -y dconf-editor gnome-shell-browser-plugin gnome-tweak-tool gnome-shell-extension-user-theme
```
#### System upgrade
```
$ sudo dnf upgrade --refresh
$ sudo dnf install dnf-plugin-system-upgrade
$ sudo dnf system-upgrade download --refresh --releasever=24
$ sudo dnf system-upgrade reboot
```
Note: (To remove packages: dnf clean packages).  
Note that virtual box guest addition needs a reinstall after a kernel update .

#### Install Guest additions (if using Virtualbox)

```
dnf install -y kernel-devel-$(uname -r)
```

#### Disable SELinux
```
Sed -i ‘s/enforcing/disabled/g’ /etc/selinux/config
```

#### Install EPEL (if CentOS)
```
yum -y install epel-release
```

#### Install Google-chrome repo

```
sudo echo "[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub" >> /etc/yum.repos.d/google-chrome.repo
```

## Bash colors

Editor: https://www.kirsle.net/wizards/ps1.html

#### Regular user (~/.bashrc)
```bash
gitBranch () {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
export PS1="\[$(tput bold)\]\[$(tput setaf 2)\]\u@\h \[$(tput setaf 7)\][\W] \[$(tput setaf 3)\]\$(gitBranch) \[$(tput setaf 2)\]\\$ \[$(tput sgr0)\]\[$(tput sgr0)\]"
```

#### Root (~/.bashrc)
```bash
gitBranch () {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}
export PS1="\[$(tput bold)\]\[$(tput setaf 1)\]\u@\h \[$(tput setaf 7)\][\W] \[$(tput setaf 3)\]\$(gitBranch) \[$(tput setaf 1)\]\\$ \[$(tput sgr0)\]\[$(tput sgr0)\]"
```

#### Other prompts
**White**: `PS1="\[$(tput bold)\]\[$(tput setaf 7)\]\u@\h [\W] \\$ \[$(tput sgr0)\]"`  
**Green**: `PS1="\[$(tput bold)\]\[$(tput setaf 2)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 2)\] \\$ \[$(tput sgr0)\]"`  
**Red**: `PS1="\[$(tput bold)\]\[$(tput setaf 1)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 1)\] \\$ \[$(tput sgr0)\]"`  
**Gold**: `PS1="\[$(tput bold)\]\[$(tput setaf 3)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 3)\] \\$ \[$(tput sgr0)\]"`  

#### Change PS1 on SSH sessions

For users users
```
if [ -n "$SSH_CLIENT" ]; then
   PS1="\[$(tput bold)\]\[$(tput setaf 3)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 3)\] \\$ \[$(tput sgr0)\]"
else
   PS1="\[$(tput bold)\]\[$(tput setaf 2)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 2)\] \\$ \[$(tput sgr0)\]"
fi
```
For root
```
if [ -n "$SSH_CLIENT" ]; then
   PS1="\[$(tput bold)\]\[$(tput setaf 3)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 3)\] \\$ \[$(tput sgr0)\]"
else
  PS1="\[$(tput bold)\]\[$(tput setaf 1)\]\u@\h \[$(tput setaf 7)\][\W]\[$(tput setaf 1)\] \\$ \[$(tput sgr0)\]"
fi
```

## Change tmps partition size
```
sudo mount -o remount,size=3G tmpfs /tmp/
```
To make it permanent, edit `/etc/fstab` to have a line like:
```
tmpfs                   /dev/shm                tmpfs   size=3g        0 0
```

## Lighttpd setup

Note: Lighttpd might have a weird bug where it serves documents in a different directory that it creates, just rename /var/www/lighttpd to /var/www/htdocs, or adjust /etc/lighttpd/lighttpd.conf accordingly.

Fix forbidden commenting:
```
## change uid to (default: don’t care)
#server.username = “www-data”
## change uid to (default: don’t care)
#server.groupname = “www-data”
```

## Change desktop

```
dnf install @kde-desktop
dnf install @mate-desktop
dnf install @xfce-desktop
dnf install @lxde-desktop
dnf install @cinnamon-desktop
```

## Configure Vim

Edit `~/.vimrc` for current user, or `/etc/vim/vimrc` for all users, and include:
```
set tabstop=4 softtabstop=0 noexpandtab shiftwidth=4
```

## Skip gnome ssh keypass (GUI for password)
Avoid gnome-ssh-keypass (graphical interface for user/pass)
Edit `~/.bashrc` to include:
```
unset SSH_ASKPASS
```

## LXDE

#### Run on init
`~/.config/lxsession/LXDE/autostart`

#### LXDE - Change background

Edit `/etc/lxdm/lxdm.conf` or change `/usr/share/backgrounds/default.png`

#### Install Caja file manager

```
$ dnf install -y caja
```
Edit `/usr/share/applications/caja.desktop` and comment the lines:
```
# OnlyShowIn=MATE
# NoDisplay=true
```
And add:
```
Categories=System;FileTools;FileManager;Utility;
```

## Proxy config
```
[root@client ~]# vi /etc/profile
# add follows to the end (set proxy settings to the environment variables)
MY_PROXY_URL="http://prox.server.world:3128/"
HTTP_PROXY=$MY_PROXY_URL
HTTPS_PROXY=$MY_PROXY_URL
FTP_PROXY=$MY_PROXY_URL
http_proxy=$MY_PROXY_URL
https_proxy=$MY_PROXY_URL
ftp_proxy=$MY_PROXY_URL
export HTTP_PROXY HTTPS_PROXY FTP_PROXY http_proxy https_proxy ftp_proxy
[root@client ~]# source /etc/profile
# it's OK all, but it's possible to set proxy settings for each application like follows
# for dnf
[root@client ~]# vi /etc/dnf/dnf.conf
# add follows to the end
proxy=http://prox.server.world:3128/
# for wget
[root@client ~]# vi /etc/wgetrc
# add follows to the end
http_proxy = http://prox.server.world:3128/
https_proxy = http://prox.server.world:3128/
ftp_proxy = http://prox.server.world:3128/
```

## Virtual box compact drive
On guest: `$ dd if=/dev/zero of=zerofillfile bs=1M`  
On message “dd: writing 'zerofillfile': No space left on device”: `$ rm zerofillfile`  
Shutdown guest and run virtualbox command: `vboxmanage modifyhd <path-to-disk>.vdi --compact`  

## Linux common bash colors
```
txtblk='\e[0;30m' # Black - Regular
txtred='\e[0;31m' # Red
txtgrn='\e[0;32m' # Green
txtylw='\e[0;33m' # Yellow
txtblu='\e[0;34m' # Blue
txtpur='\e[0;35m' # Purple
txtcyn='\e[0;36m' # Cyan
txtwht='\e[0;37m' # White
bldblk='\e[1;30m' # Black - Bold
bldred='\e[1;31m' # Red
bldgrn='\e[1;32m' # Green
bldylw='\e[1;33m' # Yellow
bldblu='\e[1;34m' # Blue
bldpur='\e[1;35m' # Purple
bldcyn='\e[1;36m' # Cyan
bldwht='\e[1;37m' # White
unkblk='\e[4;30m' # Black - Underline
undred='\e[4;31m' # Red
undgrn='\e[4;32m' # Green
undylw='\e[4;33m' # Yellow
undblu='\e[4;34m' # Blue
undpur='\e[4;35m' # Purple
undcyn='\e[4;36m' # Cyan
undwht='\e[4;37m' # White
bakblk='\e[40m'   # Black - Background
bakred='\e[41m'   # Red
bakgrn='\e[42m'   # Green
bakylw='\e[43m'   # Yellow
bakblu='\e[44m'   # Blue
bakpur='\e[45m'   # Purple
bakcyn='\e[46m'   # Cyan
bakwht='\e[47m'   # White
txtrst='\e[0m'    # Text Reset
```

## Tail color (For black backgrounds)
```
#!/bin/bash

echo "Using logPath $1"

tail -f $1 | awk '
    /DEBUG/ {print "\033[0;37m" $0 "\033[39m"}
    /WARN/ {print "\033[33m" $0 "\033[39m"}
    /INFO/ {print "\033[1;37m" $0 "\033[39m"}
    /ERROR/ {print "\033[31m" $0 "\033[39m"}
'

exit 0;
```
