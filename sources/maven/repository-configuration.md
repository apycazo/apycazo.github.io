# Distribution management config
---
```xml
<distributionManagement>
    <repository>
        <id>test-repo</id>
        <name>test-repo</name>
        <url>http://127.0.0.1:8000/repository/</url>
    </repository>
</distributionManagement>
```

# Local repository
---
```xml
<repository>
    <id>localrepo</id>
    <name>localrepo</name>
    <url>file://${basedir}/deps</url>
</repository>
```
