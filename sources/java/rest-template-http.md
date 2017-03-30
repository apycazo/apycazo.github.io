# Rest template
---

## Outbound interceptor
```java
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OutboundInterceptor implements ClientHttpRequestInterceptor
{
    @Autowired
    private ApplicationContext applicationContext;

    private String origin = "rest-service";
    private String requestOriginHeader = "X-Request-Origin";
    private String requestIdHeader = "X-Request-Id";

    @Override
    public ClientHttpResponse intercept(
            HttpRequest httpRequest,
            byte[] bytes,
            ClientHttpRequestExecution clientHttpRequestExecution)
            throws IOException
    {
        log.info("Intercepting headers");
        HttpHeaders headers = httpRequest.getHeaders();

        if (!headers.containsKey(requestOriginHeader)) {
            headers.add(requestOriginHeader, origin);
        }
        if (!headers.containsKey(requestIdHeader)) {
            headers.add(requestIdHeader, UUID.randomUUID().toString());
        }

        return clientHttpRequestExecution.execute(httpRequest, bytes);
    }
}
```

## Rest template config using Netty

An example from the legacy 'pylon' proyect:

```java
/**
 * Instances a netty factory, a rest template and an async rest template using it.
 * If another {@link ClientHttpRequestFactory} is found, then it will be used for both.
 * <p>
 * A netty http request factory is used by default, to override it, provide a {@link ClientHttpRequestFactory} bean.
 * <p>
 * Note that all this components are lazily initialized, so they will only be instanced when another bean or
 * configuration auto-wires them, or they are fetched from the spring context.
 * <p>
 * The default {@link RestTemplate} will register any {@link ClientHttpRequestInterceptor} found. To disable use the
 * property 'registerInterceptors'.
 *
 * <p>
 * Properties for this class will be fetched using the prefix: <strong>"pylon.rest"</strong>.
 *
 * <p>
 * A sample configuration for this components, using YAML and default values:
 * <pre>
 * pylon.rest:
 *      timeout: 5000
 *      registerInterceptors: true
 *      outboundProcessing: true
 *      requestOriginHeader: X-Request-Origin
 *      requestIdHeader: X-Request-Id
 * </pre>
 *
 * @author Andres Picazo
 */
@Lazy
@Slf4j
@Configuration
@ConfigurationProperties(prefix = "pylon.rest")
public class RestTemplateConfig
{
    /**
     * The connection timeout (Default value is 5000). Can be set using a config property.
     */
    private int timeout = 5000;

    /**
     * When true (default), the RestTemplate bean will register any {@link ClientHttpRequestInterceptor} found.
     */
    private boolean registerInterceptors = true;
    /**
     * When true (default), instances an Outbound interceptor, setting headers before submitting.
     */
    private boolean outboundProcessing = true;
    /**
     * The header key to be added for the request origin
     */
    private final String requestOriginHeader = "X-Request-Origin";
    /**
     * The header key to be added for the request id
     */
    private final String requestIdHeader = "X-Request-Id";

    /**
     * Fetches any {@link ClientHttpRequestInterceptor} found.
     */
    @Autowired(required = false)
    private ClientHttpRequestInterceptor[] requestInterceptors;

    /**
     * Instances a {@link Netty4ClientHttpRequestFactory} if no {@link ClientHttpRequestFactory} bean is found.
     * <p>
     * This component is lazily initialized.
     *
     * @return The instanced {@link Netty4ClientHttpRequestFactory}, configured with the provided 'timeout' value.
     */
    @Bean(name = "pylon::netty-request-factory")
    @ConditionalOnMissingBean(ClientHttpRequestFactory.class)
    protected Netty4ClientHttpRequestFactory nettyFactory ()
    {
        Netty4ClientHttpRequestFactory factory = new Netty4ClientHttpRequestFactory();
        factory.setConnectTimeout(timeout);
        return factory;
    }

    /**
     * If no other {@link RestTemplate} bean is found, will instance one. If this one is used, will fetch and register
     * any {@link ClientHttpRequestInterceptor} found.
     * <p>
     * This component is lazily initialized. Bean name is "pylon::rest-template".
     * @return a configured {@link RestTemplate}, by default using a {@link Netty4ClientHttpRequestFactory}.
     */
    @Bean(name = "pylon::rest-template")
    @ConditionalOnMissingBean(RestTemplate.class)
    protected RestTemplate instanceRestTemplate()
    {
        log.info("Instancing pylon rest template");

        RestTemplate rt = new RestTemplate(nettyFactory());

        if (registerInterceptors) {
            List<ClientHttpRequestInterceptor> list = new LinkedList<>();
            if (outboundProcessing) {
                String host;
                try {
                    host = InetAddress.getLocalHost().getHostAddress();
                } catch (UnknownHostException e) {
                    host = "0.0.0.0";
                }
                OutboundInterceptor outboundInterceptor = OutboundInterceptor.builder()
                        .origin(host)
                        .requestIdHeader(requestIdHeader)
                        .requestOriginHeader(requestOriginHeader)
                        .build();
                list.add(outboundInterceptor);
            }
            if (requestInterceptors != null && requestInterceptors.length > 0) {
                list.addAll(Arrays.asList(requestInterceptors));
            }
            rt.setInterceptors(list);
        }

        return rt;
    }

    /**
     * If no other {@link AsyncRestTemplate} is found, will instance one using the {@link Netty4ClientHttpRequestFactory}.
     * <p>
     * This component is lazily initialized.
     *
     * @return the configured async rest template. Bean name is "pylon::async-rest-template".
     */
    @Bean(name = "pylon::async-rest-template")
    @ConditionalOnMissingBean(AsyncRestTemplate.class)
    protected AsyncRestTemplate instanceAsyncRestTemplate()
    {
        return new AsyncRestTemplate(nettyFactory());
    }
}
```
