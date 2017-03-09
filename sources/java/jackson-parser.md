# Jackson parser
---
## Spring boot properties
```
spring.jackson.date-format= # Date format string or a fully-qualified date format class name. For instance `yyyy-MM-dd HH:mm:ss`.
spring.jackson.default-property-inclusion= # Controls the inclusion of properties during serialization.
spring.jackson.deserialization.*= # Jackson on/off features that affect the way Java objects are deserialized.
spring.jackson.generator.*= # Jackson on/off features for generators.
spring.jackson.joda-date-time-format= # Joda date time format string. If not configured, "date-format" will be used as a fallback if it is configured with a format string.
spring.jackson.locale= # Locale used for formatting.
spring.jackson.mapper.*= # Jackson general purpose on/off features.
spring.jackson.parser.*= # Jackson on/off features for parsers.
spring.jackson.property-naming-strategy= # One of the constants on Jackson's PropertyNamingStrategy. Can also be a fully-qualified class name of a PropertyNamingStrategy subclass.
spring.jackson.serialization.*= # Jackson on/off features that affect the way Java objects are serialized.
spring.jackson.time-zone= # Time zone used when formatting dates. For instance `America/Los_Angeles`
```

## Ignore null values
```java
@JsonInclude(Include.NON_NULL)
class Foo
{
  String bar;
}
```

## Ignore empty values
```java
@JsonInclude(Include.NON_EMPTY)
class Foo
{
  String bar;
}
```

## Ignore unknown fields
```java
@JsonIgnoreProperties(ignoreUnknown = true)
class Foo
{
  String bar;
}
```

## Serialize field order (default is alphabetic)
*Note*: Not all fields are required.
```java
@JsonPropertyOrder({ "id", "firstname", "lastname" })
public class User {
    private Long id;
    private String firstname;
    private String lastname;
}
```

## Include class info when polymorphic
Read about this [here](http://wiki.fasterxml.com/JacksonPolymorphicDeserialization)
```java
@JsonTypeInfo(use=JsonTypeInfo.Id.CLASS, include=JsonTypeInfo.As.PROPERTY, property="@class")
@JsonSubTypes({@Type(value = Foo.class), @Type(value = Bar.class)})
public interface Itf
{
    // whatever
}

public class Foo implements Itf {}
public class Bar implements Itf {}
```
