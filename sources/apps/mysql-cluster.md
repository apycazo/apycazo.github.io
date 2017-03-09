# Mysql-cluster install
---
## Download packages
```
MySQL-Cluster-server-gpl-7.4.11-1.el7.x86_64.rpm http://dev.mysql.com/downloads/file/?id=462784
MySQL-Cluster-client-gpl-7.4.11-1.el7.x86_64.rpm http://dev.mysql.com/downloads/file/?id=462783
```

## Install packages
```
dnf install MySQL-Cluster-server-gpl-7.4.11-1.el7.x86_64.rpm
dnf install MySQL-Cluster-client-gpl-7.4.11-1.el7.x86_64.rpm
```

## Create directory structure (example)
```
mkdir -p /opt/mycluster/
mkdir -p /opt/mycluster/data1
mkdir -p /opt/mycluster/data2
mkdir -p /opt/mycluster/mgmd_data
```

## Edit /etc/my.cnf
```
[mysql_cluster]
ndb-connectstring=127.0.0.1:1186
[mysqld]
# Enable MySQL Cluster
ndbcluster
# Tell this node where to find its management node
ndb-connectstring=127.0.0.1:1186
# Default storage engine
default-storage-engine = ndbcluster
```

## Create /opt/mycluster/config.ini
```
[ndbd default]
NoOfReplicas=2
MaxNoOfAttributes=10000
MaxNoOfConcurrentOperations=150000
MaxNoOfOrderedIndexes=512
[ndb_mgmd]
NodeId=1
hostname=127.0.0.1
datadir=/opt/mycluster/mgmd_data
[ndbd]
hostname=127.0.0.1
DataDir=/opt/mycluster/data1
[ndbd]
hostname=127.0.0.1
DataDir=/opt/mycluster/data2
[mysqld]
hostname=127.0.0.1
[API]
[API]
[API]
[API]
[API]
```

## Startup (first time)
```
ndb_mgmd --config-file=/opt/mycluster/config.ini
ndbd --initial
ndbd --initial
systemctl start mysql
```

## Startup (after first time)
```
ndb_mgmd --config-file=/opt/mycluster/config.ini
ndbd
ndbd
systemctl start mysql
```

## Status
```
ndb_mgm -e show
```
## Shutdown
```
ndb_mgm -e shutdown
```
## Logs
```
/opt/mycluster/mgmd_data
```
## Bash script (edit ~.bashrc)
```
function cluster {

    if [ -z $1 ];
    then
        echo "Use 'cluster [start | stop | status]' to manage cluster";
    elif [ "$1" = "start" ];
        then
            echo "Starting cluster...";
            ndb_mgmd --config-file=/opt/mycluster/config.ini;
            sleep 3;
            ndbd;
            sleep 3;
            ndbd;
    elif [ "$1" = "stop" ];
        then
            echo "Stopping cluster..."
            ndb_mgm -e shutdown;
    elif [ "$1" = "status" ];
        then
            ndb_mgm -e show;
    else
        echo "Unknown parameter $1 (use 'start', 'stop' or 'status)";
    fi
}
```

## VirtualBox

To avoid having to change the IP on config.ini, the easiest thing to do is to redirect local port ‘1186’ to guest port ‘1186’ (Use the NAT connection for this).
