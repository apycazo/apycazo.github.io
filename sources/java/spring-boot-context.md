# Spring boot context 
---
### Run after context loads
```java
@Slf4j
@Component
public class AfterContextLoads implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event)
    {
        log.info("--- READY ---");
        // just so a report can be logger after startup.
    }
}
```

### Test URL after context loads
```java
@Slf4j
@Component
public class SetupTest implements ApplicationListener<EmbeddedServletContainerInitializedEvent> {

    @Autowired
    private ServletContext servletContext;

    @Override
    public void onApplicationEvent(EmbeddedServletContainerInitializedEvent event)
    {
        // Base url
        String base = "http://127.0.0.1";
        int port = event.getEmbeddedServletContainer().getPort();
        String contextPath = servletContext.getContextPath();
        String url = base + ":" + port + contextPath + "/echo-test";

        RestTemplate rest = new RestTemplate();
        try {            
            URI uri = new URI(url);
            ResponseEntity<String> response = rest.getForEntity(uri, String.class);
            log.info("Echo test on {}", uri.toString());
            log.info("Check response... {}", (response == null ? "KO" : "OK"));
            if (response != null) {
                log.info("Check status...   {}",
                        (response.getStatusCode() != HttpStatus.OK ? "KO" : "OK"));
                log.info("Check body...     {}",
                        (response.getBody() == null || response.getBody().isEmpty() ? "KO" : "OK"));
            }
        } catch (URISyntaxException | RestClientException e) {
            log.warn("Unable to generate test query url {}", url, e);
        }
    }
}
```
