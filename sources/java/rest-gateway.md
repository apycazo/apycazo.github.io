# Rest gateway
---
A simple implementation of a rest service. It just collects and publishes services inside an API.
This reference requires updates from latest Spring Boot version.

## Gateway

```java
@Slf4j
@RestController
@RequestMapping(value = "gateway")
public class Gateway
{
    @Autowired(required = false)
    protected GatewayService[] services;
    protected Map<String, GatewayService> serviceMap;
    protected final ObjectMapper mapper;

    // JSONP support
    @ControllerAdvice
    protected static class JsonpAdvice extends AbstractJsonpResponseBodyAdvice
    {
        public JsonpAdvice()
        {
            super("callback");
            log.info(
                    "{} has JSONP support enabled",
                    Gateway.class.getSimpleName());
        }
    }

    public Gateway()
    {
        mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
    }

    protected String jsonStringError(String msg, HttpStatus status, Exception ex)
    {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("success", Boolean.FALSE);
        map.put("httpStatus", status.name());
        map.put("timestamp", System.currentTimeMillis());
        map.put("message", msg);
        if (ex != null) {
            map.put("isException", Boolean.TRUE);
            map.put("exceptionName", ex.getClass().getSimpleName());
            try {
                StackTraceElement stackTop = ex.getStackTrace()[0];
                map.put("methodName", stackTop.getMethodName());
                map.put("methodLine", stackTop.getLineNumber());
            } catch (ArrayIndexOutOfBoundsException e) {
                // Does not include stack
            }
        }
        try {
            return mapper.writeValueAsString(map);
        } catch (Exception e) {
            return "{\"success\":false}";
        }
    }

    @PostConstruct
    protected void setup()
    {
        serviceMap = new HashMap<>();
        if (services == null) {
            log.info("Gateway service has no actual services");
            services = new GatewayService[0];
        } else {
            for (GatewayService service : services) {
                String serviceName = service.getServiceName();
                serviceMap.put(serviceName, service);
                log.info("Registered gateway service '{}'", serviceName);
            }
        }
    }

    @RequestMapping(method = GET)
    public Map<String, Map<String, String>> serviceNames(HttpServletRequest request) throws MalformedURLException
    {
        Map<String, Map<String, String>> response = new LinkedHashMap<>();

        String urlString = request.getRequestURL().toString();
        if (false == urlString.endsWith("/")) urlString += "/";
        URL baseURL = new URL(urlString);

        serviceMap.keySet().stream().forEach(
                (e) -> {
                    Map<String, String> info = new LinkedHashMap<>();
                    try {
                        URL url = new URL(baseURL, e);
                        info.put("href", url.toString());
                    } catch (MalformedURLException ex) {
                        info.put("href", "");
                        info.put("ex", ex.getClass().getSimpleName());
                    } finally {
                        response.put(e, info);
                    }
                }
        );

        return response;
    }

    @RequestMapping(
            method = GET,
            value = "{serviceName}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getAsJson(
            HttpServletRequest request,
            @RequestBody(required = false) Optional<String> body,
            @PathVariable String serviceName)
    {
        // fetch service
        GatewayService service = serviceMap.get(serviceName);
        // Make sure body is not null, even if its empty
        body = body != null ? body : Optional.empty();
        if (service == null) {
            String msg = "Service " + serviceName + " does not exist.";
            HttpStatus status = HttpStatus.BAD_REQUEST;
            String error = jsonStringError(msg, status, null);
            return new ResponseEntity(error, status);
        }
        // Run service process
        Object result = service.processRequest(request, body);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
```

## Gateway service
```java
public interface GatewayService
{
    String getServiceName();
    default String getServiceVersion()
    {
        return "SNAPSHOT";
    }

    default HttpMethod [] getOptions ()
    {
        return new HttpMethod [] { HttpMethod.OPTIONS, HttpMethod.GET };
    }

    Object processRequest(HttpServletRequest request, Optional<String> body);
}
```
