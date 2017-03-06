# Jackson json ignore
---
```java
@JsonPropertyOrder({ "id", "firstname", "lastname" })
@JsonInclude(Include.NON_EMPTY)
public class User {
    private Long id;
    private String firstname;
    private String lastname;
}
```
