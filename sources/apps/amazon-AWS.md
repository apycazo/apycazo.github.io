# Amazon VM config
---
## Links
[MRemoteNG config](http://technotes.khitrenovich.com/opening-ssh-aws-hosted-linux-servers-mremoteng/)  
[Getting started](https://aws.amazon.com/es/getting-started/tutorials/launch-a-virtual-machine/)

## Login
User names seems to include:

1. root
2. ec2-user
3. ubuntu

## Reenable password access
1. Login as root using key pairs
2. Create user with  ```sudo adduser USERNAME``` and set password  ```sudo passwd USERNAME```
3. Edit /etc/ssh/sshd_config setting: ```PasswordAuthentication yes```
4. Restart daemon: ```sudo service sshd restart```
