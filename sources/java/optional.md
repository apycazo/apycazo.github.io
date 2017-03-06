# Java 8 Optional
---
```java
private static void testOptional ()
{
    log.info("Testing optional values");

    String str = "string";
    String emptyStr = "";
    String nullStr = null;

    String result;
    result = Optional.ofNullable(nullStr).orElse("str is null");
    log.info("Result (nullString) = '{}'", result);
    // Logs: Result (nullString) = 'str is null'
    result = Optional.ofNullable(emptyStr).orElse("str is null");
    log.info("Result (emptyString) = '{}'", result);
    // Logs: Result (emptyString) = ''
    result = Optional.ofNullable(str).orElse("str is null");
    log.info("Result (validString) = '{}'", result);
    // Logs: Result (validString) = 'string'
    result = Optional.of(emptyStr).orElse("str is null");
    log.info("Result (emptyString, not nullable) = '{}'", result);
    // Logs: Result (emptyString, not nullable) = ''
}
```
