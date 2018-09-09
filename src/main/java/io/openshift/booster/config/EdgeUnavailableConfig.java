package io.openshift.booster.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.nio.charset.StandardCharsets;

/**
 * EdgeUnavailableConfig
 */
@Configuration
public class EdgeUnavailableConfig {

    @Bean
    public EdgeUnavailableProperties properties() {
        return new EdgeUnavailableProperties();
    }


    @Bean
    public MessageSource templateMessage() {
        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasenames(properties().getBundleResourceLocation());
        source.setDefaultEncoding(StandardCharsets.UTF_8.name());
        source.setFallbackToSystemLocale(false);
        return source;
    }
}
