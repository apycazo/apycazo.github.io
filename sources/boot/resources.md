# Resources
---
### Add path handlers
```java
@Configuration
@EnableWebMvc
public class WebResourceConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/static/**/*")                
                .addResourceLocations(
                        "/resources/static/test",
                        "/resources/static/common"
                );
    }
}
```
