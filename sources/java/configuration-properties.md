# Configuration properties
---
### Add properties without annotations
```java
@Bean
public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
    PropertySourcesPlaceholderConfigurer propertyConfigurer = new PropertySourcesPlaceholderConfigurer();
    propertyConfigurer.setLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/**/abc.properties"));
    return propertyConfigurer;
}

```
### Validate ConfigProperties fields
```java
@NotNull
@Pattern(regexp = "\\w+", message = "ID must only contains letters, numbers and '_'")
private String id;
```
