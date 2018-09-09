package io.openshift.booster.web;

import io.openshift.booster.model.UnavailableException;
import io.openshift.booster.config.EdgeUnavailableProperties;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * GlobalErrorController
 */
@Controller
public class GlobalErrorController implements ErrorController {

    private final EdgeUnavailableProperties edgeUnavailableProperties;

    public GlobalErrorController(EdgeUnavailableProperties edgeUnavailableProperties) {
        this.edgeUnavailableProperties = edgeUnavailableProperties;
    }

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        throw new UnavailableException(edgeUnavailableProperties.getCode());
    }

    @Override
    public String getErrorPath() {
        return null;
    }
}

