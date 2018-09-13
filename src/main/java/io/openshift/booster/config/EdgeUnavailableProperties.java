package io.openshift.booster.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/**
 * EdgeUnavailableProperties
 */
@Component
@ConfigurationProperties("site-off")
@Data
public class EdgeUnavailableProperties {
    private String code = "SESSION_CHANGE";
    private String bundleResourceLocation = "templates/messages";
    private int messageCacheSeconds = 300;
}
