package io.openshift.booster.web;

import io.openshift.booster.model.UnavailableException;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * GlobalErrorController
 */
@Controller
public class GlobalErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        throw new UnavailableException("Error unavalaible");
    }

    @Override
    public String getErrorPath() {
        return null;
    }
}

