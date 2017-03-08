# Maven settings example
---
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <localRepository>${user.home}/.m2/repository</localRepository>
    <interactiveMode>true</interactiveMode>
    <usePluginRegistry>false</usePluginRegistry>
    <offline>false</offline>
    <servers>
        <server>
            <id>demo-server</id>
            <username>root</username>
            <password>root</password>
        </server>
    </servers>
    <mirrors />
    <proxies>
        <proxy>
            <id>optional</id>
            <active>true</active>
            <protocol>http</protocol>
            <!--
            <username>optional-proxyuser</username>
            <password>optional-proxypass</password>
            -->
            <host>proxy.safezone.com</host>
            <port>8000</port>
            <nonProxyHosts>localhost | 127.0.0.1</nonProxyHosts>
        </proxy>
    </proxies>
</settings>
```
