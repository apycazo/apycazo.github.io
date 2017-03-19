# Docker
---
## Useful commands

| Operation                   | Command                                           |  
|-----------------------------| --------------------------------------------------|  
| Process list                | `docker ps`                                       |  
| Process list (all)          | `docker ps -a`                                    |  
| Run container in background | `docker run -d <tag>`                             |  
| Run on container            | `docker exec <tag> <cmd>`                         |  
| Run on interactive tty      | `docker run -it <tag> <cmd>`                      |  
| Run & dispose container     | `docker run -it --rm <tag> <cmd>`                 |  
| Stop all containers         | `docker stop $(docker ps -a -q)`                  |  
| Kill all containers         | `docker kill $(docker ps -a -q)`                  |  
| Remove all containers       | `docker rm $(docker ps -a -q)`                    |  
| Remove dangling containers  | `docker rmi $(docker images -q -f dangling=true)` |  
| Network list                | `docker network`                                  |  
| Network details (bridge)    | `docker network inspect bridge`                   |  
| Build image with tags       | `docker build -t <tag> .`                         |  
| Open bash terminal          | `docker exec -ti trivialis-provider /bin/bash`    |
| Container logs              | `docker log <tag>`                                |
| Container logs (+ tail)     | `docker log -ft <tag>`                            |

## Sample image Dockerfile

From [trivialis](https://github.com/apycazo/trivialis) repo:
```
### ==========================================================================
### Docker image for the trivialis provider to run:
### $ mvn clean package && docker build -t trivialis/provider .
### $ docker run -d -p 8080:8080 --name trivialis-provider trivialis/provider
### ==========================================================================

# Use Centos as base layer
FROM centos
# Run system update
RUN yum -y upgrade
# Install openjdk
RUN yum -y install java-1.8.0-openjdk
# Open port
EXPOSE 8080
# Mount tmp volume on host
VOLUME /tmp
# Add jar file
ADD /target/trivialis-provider-1.0-SNAPSHOT.jar trivialis-provider.jar
# Update 'last modified' field
RUN sh -c 'touch /trivialis-provider.jar'
# On start command
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/trivialis-provider.jar"]
```

## Network connect

Excerpt from docker documentation:

#### Connect a running container to a network
```
$ docker network connect multi-host-network container1
```

#### Connect a container to a network when it starts
You can also use the `docker run --network=<network-name>` option to start a container and immediately connect it to a network.
```
$ docker run -itd --network=multi-host-network busybox
```

#### Specify the IP address a container will use on a given network
You can specify the IP address you want to be assigned to the container’s interface.
```
$ docker network connect --ip 10.10.36.122 multi-host-network container2
```

## Volume Mount
Use parameter `-v <target>` to mount a volume on the container (this is equivalent to use `VOLUME` on the Dockerfile).  An example:

```
docker run -d -P --name web -v /webapp training/webapp python app.py
```  
*Note: the -P option maps ports ensuring no conflicts*

## To save a running container as an image

```
docker commit -m “commit message” -a “author” container_name username/image_name:tag
```
