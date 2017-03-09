# Spring MVC

## Content negotiation (custom)
```java
@Slf4j
@Configuration
@EnableWebMvc
public class StatusConfig extends WebMvcConfigurerAdapter
{
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer)
    {
        // No header, No extension -> JSON
        // Header, No extension -> Header.type
        // Header, Extension -> Extension.type
        configurer.favorPathExtension(true)
                .useJaf(false) // to allow us to define media types manually
                .defaultContentType(MediaType.APPLICATION_JSON)
                .mediaType("xml", MediaType.APPLICATION_XML)
                .mediaType("json", MediaType.APPLICATION_JSON);
    }
}
```

## Async rest template
```java
HttpHeaders jsonHeaders = new HttpHeaders();
jsonHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
jsonHeaders.setContentType(MediaType.APPLICATION_JSON);
// create entity to be sent
HttpEntity<EventMessage> entity = new HttpEntity<>(eventMessage, jsonHeaders);
// send async post request
ListenableFuture<ResponseEntity<Void>> futureEntity;
futureEntity = rest.exchange(targetEndpoint, HttpMethod.POST, entity, Void.class);
// add callbacks (success: do nothing, failure: log error)
futureEntity.addCallback(
    (ok) -> {},
    (err) -> log.warn("Forwarding error: {} ({})", err.getClass().getSimpleName(), err.getMessage())
);
```

## Rest template exchange
```java
URI uri = new UriTemplate("http://example.com/{foo}").expand("bar");
String response = new RestTemplate()
    .exchange(RequestEntity.post(uri).accept(MediaType.APPLICATION_JSON).body("sample"), String.class)
    .getBody();
```        
